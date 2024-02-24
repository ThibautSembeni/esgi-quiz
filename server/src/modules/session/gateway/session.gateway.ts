import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Inject, Logger, Req, UseGuards } from '@nestjs/common';
import { ParticipationService } from '../../participation/services/participation.service';
import { SessionService } from '../services/session.service';
import { UserService } from '../../user/services/user.service';
import { User } from '../../user/entities/user.entity';
import { Session, SessionStatus } from '../entities/session.entity';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { WsJwtStrategy } from '../../auth/ws-jwt.strategy';
import { WsJwtAuthGuard } from '../../auth/ws-jwt-auth.guard';
import { session } from 'passport';
import { QuestionService } from '../../question/services/question.service';
import { Question } from '../../question/entities/question.entity';
import { AnswerService } from '../../answer/services/answer.service';
import { OptionService } from '../../option/services/option.service';

@WebSocketGateway({ cors: true, namespace: 'session' })
export class SessionGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('SessionGateway');

  constructor(
    @Inject(SessionService)
    private readonly sessionService: SessionService,
    @Inject(UserService)
    private readonly userService: UserService,
    @Inject(ParticipationService)
    private readonly participationService: ParticipationService,
    @Inject(QuestionService)
    private readonly questionService: QuestionService,
    @Inject(AnswerService)
    private readonly answerService: AnswerService,
    @Inject(OptionService)
    private readonly optionService: OptionService,
  ) {}

  @SubscribeMessage('join')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { session_id: string; username: string },
  ): Promise<void> {
    this.logger.log(`Payload: ${JSON.stringify(data)}`);
    await this.registerSession(client, data.username, data.session_id);
    const participantsCount = await this.getParticipantsCount(data.session_id);
    this.server.emit('members-number', participantsCount);
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('start-session')
  async handleStartSession(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { session: string },
  ): Promise<void> {
    const user: User = (client?.handshake as any)?.user;
    if (!user) {
      this.logger.error('User not found');
      client.emit('unauthorized');
      return;
    }
    if (!data.session) {
      this.logger.error('Session not found');
      client.emit('session_not_found');
      return;
    }
    const currentSession = await this.findSession(data.session);
    if (user.id === currentSession.creator.id) {
      await this.updateSession(data.session, SessionStatus.STARTED);
      this.launchQuizWorkflow(data.session);
    }
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('finish-session')
  async handleFinishSession(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { session: string },
  ): Promise<void> {
    const user: User = (client?.handshake as any)?.user;
    if (!user) {
      this.logger.error('User not found');
      client.emit('unauthorized');
      return;
    }
    if (!data.session) {
      this.logger.error('Session not found');
      client.emit('session_not_found');
      return;
    }
    const currentSession = await this.findSession(data.session);
    if (user.id === currentSession.creator.id) {
      await this.updateSession(data.session, SessionStatus.FINISH);
    }
  }

  @SubscribeMessage('answer-question')
  async handleReceiveAnswer(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { option_id: number; question_id: number },
  ): Promise<void> {
    console.log('client id', client.id);
    this.logger.log(`Payload: ${JSON.stringify(data)}`);
    const participation = await this.getParticipation(client);
    console.log('Participation: ', participation);
    const question = await this.questionService.findOne({
      where: { id: data.question_id },
    });
    const option = await this.optionService.findOne({
      where: { id: data.option_id },
    });

    await this.answerService.create({
      participation: participation,
      question: question,
      option: option,
    });
  }

  handleConnection(@ConnectedSocket() client: Socket, ...args: any[]): any {
    this.logger.log(`Client connected: ${client.id}`);
  }

  async handleDisconnect(@ConnectedSocket() client: Socket): Promise<any> {
    this.logger.log(`Client disconnected: ${client.id}`);
    await this.removeParticipantWhenSessionIsNotStarted(client);
  }

  async registerSession(client: Socket, username: string, session_id: string) {
    const session = await this.findSession(session_id);
    if (!session) {
      this.logger.error(
        `Session not found: ${session_id} => Disconnecting client...`,
      );
      client.emit('session_not_found');
    } else {
      this.logger.log(`Session found: ${JSON.stringify(session)}`);
      const user = await this.registerGuestUser(username);
      this.logger.log(`User registered: ${JSON.stringify(user)}`);
      await this.registerParticipation(user, session, client);
    }
  }

  async findSession(session_id: string) {
    return await this.sessionService.findOne({
      where: { id: session_id },
    });
  }

  async registerGuestUser(username: string) {
    return await this.userService.createGuest({
      username,
    });
  }

  async registerParticipation(user: User, session: Session, client: Socket) {
    return await this.participationService.create({
      session: session,
      quiz: session.quiz,
      user: user,
      clientId: client.id,
    });
  }

  async updateSession(session_id: string, status: SessionStatus) {
    return await this.sessionService.update(session_id, {
      status,
    });
  }

  async getParticipantsCount(session_id: string): Promise<number> {
    return await this.participationService.count({
      session: { id: session_id },
    });
  }

  async getSession(session_id: string) {
    return await this.sessionService.findOne({
      where: { id: session_id },
      relations: ['creator', 'quiz', 'quiz.questions'],
    });
  }

  async removeParticipation(client: Socket) {
    return await this.participationService.deleteByClientId(client.id);
  }

  async getParticipation(client: Socket) {
    return await this.participationService.findOne({
      where: { clientId: client.id },
      relations: ['session'],
    });
  }

  async removeParticipantWhenSessionIsNotStarted(client: Socket) {
    const participation = await this.getParticipation(client);
    if (participation) {
      const sessionId = participation.session.id;
      const session = await this.getSession(sessionId);
      if (session.status === SessionStatus.INACTIVE) {
        await this.removeParticipation(client);
      }
      const participantsCount = await this.getParticipantsCount(sessionId);
      this.server.emit('members-number', participantsCount);
    }
  }

  async launchQuizWorkflow(session_id: string) {
    this.server.emit('session-started');
    const session = await this.getSession(session_id);
    const questions = await this.questionService.findManyOfQuiz(session.quiz);
    for (const question of questions) {
      await this.sendQuestionToParticipants(question);
      await this.sendResultsToParticipants(session_id, question);
    }
    await this.updateSession(session_id, SessionStatus.FINISH);
  }

  async sendQuestionToParticipants(question: Question) {
    this.server.emit('question-sent', question);
    let countdown = question.duration;
    await new Promise((resolve) => {
      const countdownInterval = setInterval(() => {
        this.server.emit('countdown', countdown);
        countdown--;
        if (countdown < 0) {
          clearInterval(countdownInterval);
          resolve(null);
        }
      }, 1000);
    });
  }

  async sendResultsToParticipants(session_id: string, question: Question) {
    const participations = await this.participationService.findMany({
      where: { session: { id: session_id } },
    });
    const results = await this.answerService.countAnswersByQuestion(
      question.id,
      session_id,
    );
    for (const participation of participations) {
      const answer = await this.answerService.findOne({
        where: { participation: { id: participation.id }, question: question },
        relations: ['option'],
      });
      this.server.to(participation.clientId).emit('results-sent', {
        correct_answer: answer.option.is_correct,
        results,
      });
    }
    await new Promise((resolve) => setTimeout(resolve, 10000));
  }

  async sendToAllClients(session_id: string, message: string, data: any) {
    const participations = await this.participationService.findMany({
      where: { session: { id: session_id } },
    });
    console.log('Participations: ', participations);
    for (const participation of participations) {
      this.server.to(participation.clientId).emit(message, data);
    }
  }
}
