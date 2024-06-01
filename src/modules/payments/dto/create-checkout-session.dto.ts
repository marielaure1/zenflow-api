import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCheckoutSessionDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsString()
  @IsNotEmpty()
  customerId: string;
}
