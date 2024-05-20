import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PlansStripeService } from "@providers/services/stripe/plans/plans.stripe.service";
import settings from '@constants/settings';

@Module({})
export class StripeModule {

  static forRootAsync(): DynamicModule {
    return {
      module: StripeModule,
      controllers: [],
      imports: [ConfigModule.forRoot()],
      providers: [
        PlansStripeService,
        {
          provide: 'STRIPE_API_KEY',
          useFactory: async (configService: ConfigService) =>
            configService.get(settings.STRIPE_API_KEY),
          inject: [ConfigService],
        },
      ],
    };
  }
}