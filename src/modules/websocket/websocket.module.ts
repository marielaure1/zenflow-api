import { Module } from '@nestjs/common';
import { WebsocketService } from './websocket.service';
import { WebsocketGateway } from './websocket.gateway';

@Module({
  providers: [WebsocketGateway, WebsocketService],
  exports: [WebsocketModule, WebsocketService]
})
export class WebsocketModule {}
