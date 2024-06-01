import { Module } from '@nestjs/common';
import { PaymentsService } from '@modules/payments/payments.service';
import { PaymentsController } from '@modules/payments/payments.controller';
import { DatabaseModule } from '@config/database/mongoose/mongoose.module';
import { StripeModule } from '@providers/services/stripe/stripe.module'; 
import { PlansStripeService } from "@providers/services/stripe/services/plans.stripe.service";
import { PaymentsStripeService } from "@providers/services/stripe/services/payments.stripe.service";

@Module({
  imports: [DatabaseModule, StripeModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentsStripeService, PlansStripeService],
  exports: [PaymentsModule]
})
export class PaymentsModule {}
