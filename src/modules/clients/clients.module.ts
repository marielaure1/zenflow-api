import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { UsersService } from '@modules/users/users.service';
import { UsersModule } from '@modules/users/users.module';
import { CustomersService } from '@modules/customers/customers.service';
import { CustomersModule } from '@modules/customers/customers.module';
import { CustomFieldsService } from '@modules/custom-fields/custom-fields.service';
import { CustomFieldsModule } from '@modules/custom-fields/custom-fields.module';

@Module({
  imports: [UsersModule, CustomersModule, CustomFieldsModule],
  controllers: [ClientsController],
  providers: [ClientsService, UsersService, CustomersService, CustomFieldsService],
  exports: [ClientsModule]
})
export class ClientsModule {}
