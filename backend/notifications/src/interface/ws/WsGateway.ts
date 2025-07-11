import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class WsGateway {
  @WebSocketServer()
  server: Server;

  broadcast(event: any) {
    this.server.emit('notification', event);
  }
}
