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
import { Inject, Logger } from '@nestjs/common';
import { ParticipationService } from '../../participation/services/participation.service';
import { SessionService } from '../services/session.service';
import { UserService } from '../../user/services/user.service';
import { User } from '../../user/entities/user.entity';
import { Session } from '../entities/session.entity';

@WebSocketGateway({ cors: true, namespace: 'session' })
export class SessionGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('SessionGateway');
  private session_id: string;

  constructor(
    @Inject(SessionService)
    private readonly sessionService: SessionService,
    @Inject(UserService)
    private readonly userService: UserService,
    @Inject(ParticipationService)
    private readonly participationService: ParticipationService,
  ) {}

  @SubscribeMessage('join')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { session_id: string; username: string },
  ): void {
    this.logger.log(`Payload: ${JSON.stringify(data)}`);
    this.session_id = data.session_id;
    this.registerSession(client, data.username);
  }

  handleConnection(@ConnectedSocket() client: Socket, ...args: any[]): any {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(@ConnectedSocket() client: Socket): any {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  async registerSession(client: Socket, username: string) {
    const session = await this.findSession(this.session_id);
    if (!session) {
      this.logger.error(
        `Session not found: ${this.session_id} => Disconnecting client...`,
      );
      client.emit('session_not_found');
    } else {
      this.logger.log(`Session found: ${JSON.stringify(session)}`);
      const user = await this.registerGuestUser(username);
      this.logger.log(`User registered: ${JSON.stringify(user)}`);
      this.registerParticipation(user, session, client);
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
}
