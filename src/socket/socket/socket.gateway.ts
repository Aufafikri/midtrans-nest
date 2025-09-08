import { OnModuleInit } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000']
  }
})

export class SocketGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(`Client connected: ${socket.id}`);
      console.log('user connected')
    });
  }

  @SubscribeMessage('newMessage')
  handleMessage(@MessageBody() body: any ) {
    this.server.emit('onMessage', {
      msg: 'new message',
      content: body
    })
  }
}
