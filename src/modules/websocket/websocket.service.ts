import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class WebsocketService {
  private server: Server;

  setServer(server: Server) {
    this.server = server;
    console.log('Server set:', server);
  }

  notifyCustomerCreated(customer: any) {
    console.log('Notifying clients about customer creation:', customer);
    if (this.server) {
      this.server.emit('customerCreated', customer);
      console.log('Notification sent');
    } else {
      console.log('Server is not set');
    }
  }
}
