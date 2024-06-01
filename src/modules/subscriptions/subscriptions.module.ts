import { Module } from '@nestjs/common';
import { DatabaseModule } from '@config/database/mongoose/mongoose.module';
import { SubscriptionsService } from '@modules/subscriptions/subscriptions.service';
import { CustomersService } from '@modules/customers/customers.service';
import { UsersService } from '@modules/users/users.service';
import { PlansService } from '@modules/plans/plans.service';
import { SubscriptionsController } from '@modules/subscriptions/subscriptions.controller';
import { StripeModule } from '@providers/services/stripe/stripe.module'; 
import { SubscriptionsStripeService } from "@providers/services/stripe/services/subscriptions.stripe.service";
import { CustomersStripeService } from '@providers/services/stripe/services/customers.stripe.service';


@Module({
  imports: [DatabaseModule, StripeModule], 
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService, SubscriptionsStripeService, CustomersStripeService,  CustomersService, UsersService, PlansService],
  exports: [SubscriptionsModule]
})
export class SubscriptionsModule {}
  