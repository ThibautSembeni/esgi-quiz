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
  ) {}

  @SubscribeMessage('join')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { session_id: string; username: string },
  ): Promise<void> {
    this.logger.log(`Payload: ${JSON.stringify(data)}`);
    await this.registerSession(client, data.username, data.session_id);
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
      this.logger.log(
        `Start session: ${JSON.stringify(
          data,
        )}, currentSession: ${JSON.stringify(currentSession)}`,
      );
      await this.updateSession(data.session, SessionStatus.STARTED);
    }
  }

  handleConnection(@ConnectedSocket() client: Socket, ...args: any[]): any {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(@ConnectedSocket() client: Socket): any {
    this.logger.log(`Client disconnected: ${client.id}`);
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
}
