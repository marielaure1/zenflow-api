import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from '@modules/subscriptions/dto/create-subscription.dto';
import { UpdateSubscriptionDto } from '@modules/subscriptions/dto/update-subscription.dto';

@Injectable()
export class SubscriptionsService   {
  create(createSubscriptionDto: CreateSubscriptionDto) {
    return 'This action adds a new subscribe';
  }

  findAll() {
    return `This action returns all subscribes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subscribe`;
  }

  update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    return `This action updates a #${id} subscribe`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscribe`;
  }
}
