import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
// import { FirebaseModule } from '@providers/services/firebase/firebase.module';
import { UsersModule } from '@modules/users/users.module';
import { UsersService } from '@modules/users/users.service';
import { CustomersModule } from '@modules/customers/customers.module';
import { CustomersService } from '@modules/customers/customers.service';
import { CustomersStripeService } from '@providers/services/stripe/services/customers.stripe.service';
import { SupabaseModule } from '@providers/services/supabase/supabase.module';

@Module({
  imports: [SupabaseModule, UsersModule, CustomersModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService, CustomersService, CustomersStripeService],
})
export class AuthModule {}
