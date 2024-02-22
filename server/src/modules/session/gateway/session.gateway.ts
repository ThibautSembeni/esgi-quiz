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
import { Logger } from '@nestjs/common';

@WebSocketGateway({ cors: true, namespace: 'session' })
export class SessionGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('SessionGateway');

  @SubscribeMessage('session-id')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() session_id: string,
  ): void {
    this.logger.log(`Payload: ${JSON.stringify(session_id)}`);
  }

  handleConnection(@ConnectedSocket() client: Socket, ...args: any[]): any {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(@ConnectedSocket() client: Socket): any {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
