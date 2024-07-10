import { Module, forwardRef } from '@nestjs/common';
import { SupabaseService } from '@providers/services/supabase/supabase.service';
import { SupabaseController } from '@providers/services/supabase/supabase.controller';
import { UsersService } from '@modules/users/users.service';
import { CustomersService } from '@modules/customers/customers.service';
import { UsersModule } from '@modules/users/users.module';
import { CustomersStripeService } from '@providers/services/stripe/services/customers.stripe.service';
import { CustomersModule } from '@modules/customers/customers.module';
import { StripeModule } from '@providers/services/stripe/stripe.module';
import { WebsocketService } from '@modules/websocket/websocket.service';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    CustomersModule,
    StripeModule,
  ],
  providers: [
    SupabaseService,
    UsersService,
    CustomersService,
    CustomersStripeService,
    WebsocketService
  ],
  controllers: [SupabaseController],
  exports: [SupabaseService],
})
export class SupabaseModule {}
