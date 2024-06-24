import { Module } from '@nestjs/common';
import { CustomFieldsService } from './custom-fields.service';
import { CustomFieldsController } from './custom-fields.controller';
import { UsersModule } from '@modules/users/users.module';
import { CustomersModule } from '@modules/customers/customers.module';
import { UsersService } from '@modules/users/users.service';
import { CustomersService } from '@modules/customers/customers.service';

@Module({
  imports: [UsersModule, CustomersModule],
  controllers: [CustomFieldsController],
  providers: [CustomFieldsService, UsersService, CustomersService],
  exports: [CustomFieldsModule]
})
export class CustomFieldsModule {}
