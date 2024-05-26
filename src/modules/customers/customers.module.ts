import { Module } from '@nestjs/common';
import { CustomersService } from '@modules/customers/customers.service';
import { CustomersController } from '@modules/customers/customers.controller';
import { DatabaseModule } from '@config/database/mongoose/mongoose.module';
import { UsersModule } from '@modules/users/users.module';
import { UsersService } from '@modules/users/users.service';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [CustomersController],
  providers: [CustomersService, UsersService],
  exports: [CustomersModule]
})
export class CustomersModule {}
