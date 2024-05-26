import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FirebaseModule } from '@providers/services/firebase/firebase.module';
import { UsersModule } from '@modules/users/users.module';
import { UsersService } from '@modules/users/users.service';
import { CustomersModule } from '@modules/customers/customers.module';
import { CustomersService } from '@modules/customers/customers.service';

@Module({
  imports: [FirebaseModule, UsersModule, CustomersModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService, CustomersService],
})
export class AuthModule {}
