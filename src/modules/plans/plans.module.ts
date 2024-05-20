import { Module } from '@nestjs/common';
import { PlansService } from '@modules/plans/plans.service';
import { PlansController } from '@modules/plans/plans.controller';
import { DatabaseModule } from '@config/database/mongoose/mongoose.module';
import { StripeModule } from '@providers/services/stripe/stripe.module';

@Module({
  imports: [DatabaseModule, StripeModule],
  controllers: [PlansController],
  providers: [PlansService],
})
export class PlansModule {}
