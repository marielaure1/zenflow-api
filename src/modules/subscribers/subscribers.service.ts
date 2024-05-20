import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subscriber, SubscriberDocument } from '@modules/subscribers/entities/subscriber.entity';
import { CreateSubscriberDto } from '@modules/subscribers/dto/create-subscriber.dto';

@Injectable()
export class SubscribersService {
  constructor(
    @InjectModel(Subscriber.name) private subscriberModel: Model<SubscriberDocument>,
  ) {}

  async create(createSubscriberDto: CreateSubscriberDto): Promise<Subscriber> {
    const createdSubscriber = new this.subscriberModel(createSubscriberDto);
    return createdSubscriber.save();
  }
}
