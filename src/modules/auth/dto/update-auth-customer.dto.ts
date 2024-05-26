import { PartialType } from '@nestjs/swagger';
import { CreateAuthDto } from './create-auth-customer.dto';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}
