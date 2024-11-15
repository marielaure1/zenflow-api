import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { CustomersService } from '@modules/customers/customers.service';
import { CustomersController } from '@modules/customers/customers.controller';
import { DatabaseModule } from '@config/database/mongoose/mongoose.module';
import { UsersModule } from '@modules/users/users.module';
import { UsersService } from '@modules/users/users.service';
import { CustomersStripeService } from '@providers/services/stripe/services/customers.stripe.service';
import { AuthMiddleware } from '@middleware/auth/auth.middleware';
import { SupabaseService } from '@providers/services/supabase/supabase.service';
import { SupabaseModule } from '@providers/services/supabase/supabase.module';
// import { AuthMiddleware } from '@middleware/auth/auth.middleware';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [CustomersController],
  providers: [CustomersService, UsersService, CustomersStripeService, SupabaseService],
  exports: [CustomersModule]
})
export class CustomersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        'customers/register',
      )
      .forRoutes(CustomersController);
  }
}
