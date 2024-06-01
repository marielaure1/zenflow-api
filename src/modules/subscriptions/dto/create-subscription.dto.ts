import { IsString, IsNotEmpty, IsDateString, IsOptional, IsEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateSubscriptionDto {
  @IsNotEmpty()
  @IsString()
  customer: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  plan: Types.ObjectId;

  @IsEmpty()
  @IsString()
  stripeCustomerId?: string;

  @IsEmpty()
  @IsString()
  stripeSubscriptionId?: string;

  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @IsOptional()
  @IsDateString()
  endDate?: Date;
}
