import { IsString, IsNumber, IsNotEmpty, IsEnum, IsArray, IsEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PlanInterval } from '@modules/plans/enum/plan-interval.enum';

export class CreatePlanDto {
  @ApiProperty({ description: 'The name of the plan' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'The description of the plan' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'The amount of the plan' })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'The currency of the plan' })
  @IsNotEmpty()
  @IsString()
  currency: string;

  @ApiProperty({ description: 'The interval of the plan', enum: PlanInterval })
  @IsNotEmpty()
  @IsEnum(PlanInterval)
  interval: PlanInterval;

  @ApiProperty({ description: 'The Stripe plan ID', required: false })
  @IsEmpty()
  @IsString()
  stripePlanId?: string;

  @ApiProperty({ description: 'The features of the plan', type: [String] })
  @IsArray()
  features: string[];
}

export class UpdatePlanDto extends CreatePlanDto {}
