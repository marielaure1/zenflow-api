import { Controller, Body, Patch, Param } from '@nestjs/common';
import { CustomersService } from '@modules/customers/customers.service';
import { CreateCustomerDto } from '@modules/customers/dto/create-customer.dto';
import { Customer } from '@modules/customers/entities/customer.entity';
import { AppController } from '@modules/app.controller';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('customers')
@Controller('customers')
export class CustomersController extends AppController<CustomersService, Customer, CreateCustomerDto, CreateCustomerDto>{
  constructor(
      private readonly customersService: CustomersService
  ) {
      super(customersService, "customers");
  }
}
