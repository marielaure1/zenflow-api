import { IsString, IsNotEmpty, IsOptional, IsEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubscriptionDto {
  @ApiProperty({ description: 'The customer ID for the subscription' })
  @IsString()
  @IsNotEmpty()
  customer: string;

  @ApiProperty({ description: 'The plan ID for the subscription' })
  @IsString()
  @IsNotEmpty()
  plan: string;

  @ApiProperty({ description: 'The stripe customer id', required: false })
  @IsEmpty()
  @IsString()
  stripeCustomerId?: string;

  @ApiProperty({ description: 'The stripe subscription id', required: false })
  @IsEmpty()
  @IsString()
  stripeSubscriptionId?: string;

  @ApiProperty({ description: 'The start date of the subscription', required: false })
  @IsOptional()
  @IsString()
  startDate?: string;

  @ApiProperty({ description: 'The end date of the subscription', required: false })
  @IsOptional()
  @IsString()
  endDate?: string;
}

export class UpdateSubscriptionDto extends CreateSubscriptionDto {}

