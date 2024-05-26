import { Document } from 'mongoose';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { CreateUserDto } from '@modules/users/dto/create-user.dto';
import { CreateCustomerDto } from '@modules/customers/dto/create-customer.dto';

export class CreateAuthDto extends IntersectionType(
  Document,
  CreateUserDto,
  CreateCustomerDto,
) {}