import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User, UserSchema } from '@modules/users/entities/user.entity';
import { Customer, CustomerSchema } from '@modules/customers/entities/customer.entity';
import { Plan, PlanSchema } from '@modules/plans/entities/plan.entity';
import { Subscription, SubscriptionSchema } from '@modules/subscriptions/entities/subscription.entity';
import settings from '@/common/constants/settings';
import { Payment, PaymentSchema } from '@modules/payments/entities/payment.entity';
@Global()
@Module({
  imports: [
    MongooseModule.forRoot(settings.MONGODB_URL),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Customer.name, schema: CustomerSchema },
      { name: Plan.name, schema: PlanSchema },
      { name: Subscription.name, schema: SubscriptionSchema },
      { name: Payment.name, schema: PaymentSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
