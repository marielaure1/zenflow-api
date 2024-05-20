import { PartialType } from '@nestjs/swagger';
import { CreateSubscriptionDto } from '@modules/subscriptions/dto/create-subscription.dto';

export class UpdateSubscriptionDto extends PartialType(CreateSubscriptionDto) {}
