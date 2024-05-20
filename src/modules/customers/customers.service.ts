import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCustomerDto } from '@modules/customers/dto/create-customer.dto';
import { Customer, CustomerDocument } from '@modules/customers/entities/customer.entity';
import { AppService } from '@modules/app.service';

@Injectable()
export class CustomersService extends AppService<CustomerDocument, CreateCustomerDto, CreateCustomerDto>{
  
  constructor(@InjectModel(Customer.name) private customersModel: Model<CustomerDocument>) {
    super(customersModel);
  }
}
