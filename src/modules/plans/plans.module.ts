import { Module } from '@nestjs/common';
import { PlansService } from '@modules/plans/plans.service';
import { PlansController } from '@modules/plans/plans.controller';
import { DatabaseModule } from '@config/database/mongoose/mongoose.module';
import { StripeModule } from '@providers/services/stripe/stripe.module'; 
import { PlansStripeService } from "@providers/services/stripe/plans/plans.stripe.service"
@Module({
  imports: [DatabaseModule, StripeModule], // Assurez-vous d'appeler la méthode forRootAsync() ici
  controllers: [PlansController],
  providers: [PlansService, PlansStripeService],
})
export class PlansModule {}
