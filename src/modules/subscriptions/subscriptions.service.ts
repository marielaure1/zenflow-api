import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSubscriptionDto } from '@modules/subscriptions/dto/create-subscription.dto';
import { UpdateSubscriptionDto } from '@modules/subscriptions/dto/update-subscription.dto';
import { Subscription, SubscriptionDocument } from '@modules/subscriptions/entities/subscription.entity';
import { AppService } from '@modules/app.service';

@Injectable()
export class SubscriptionsService extends AppService<SubscriptionDocument, CreateSubscriptionDto, UpdateSubscriptionDto>{

  constructor(
    @InjectModel(Subscription.name) private subscriptionsModel: Model<SubscriptionDocument>
  ) {
    super(subscriptionsModel);
  }

}
