import { Controller, Post, Body } from '@nestjs/common';
import { SubscribersService } from '@modules/subscribers/subscribers.service';
import { CreateSubscriberDto } from '@modules/subscribers/dto/create-subscriber.dto';

@Controller('subscribers')
export class SubscribersController {
  constructor(private readonly subscriberService: SubscribersService) {}

  @Post()
  async create(@Body() createSubscriberDto: CreateSubscriberDto) {
    return this.subscriberService.create(createSubscriberDto);
  }
}
