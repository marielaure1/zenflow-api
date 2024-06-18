import { Module } from '@nestjs/common';
import { ProspectsService } from './prospects.service';
import { ProspectsController } from './prospects.controller';
import { UsersModule } from '@modules/users/users.module';
import { CustomersModule } from '@modules/customers/customers.module';
import { CustomFieldsModule } from '@modules/custom-fields/custom-fields.module';
import { UsersService } from '@modules/users/users.service';
import { CustomersService } from '@modules/customers/customers.service';
import { CustomFieldsService } from '@modules/custom-fields/custom-fields.service';

@Module({
  imports: [UsersModule, CustomersModule, CustomFieldsModule],
  controllers: [ProspectsController],
  providers: [ProspectsService, UsersService, CustomersService, CustomFieldsService],
  exports: [ProspectsModule]
})
export class ProspectsModule {}
