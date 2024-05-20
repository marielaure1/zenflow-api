import { IsString, IsNumber, IsNotEmpty, IsEnum, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PlanInterval } from '@modules/plans/enum/plan-interval.enum';

export class CreatePlanDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly currency: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(PlanInterval)
  readonly interval: PlanInterval;

  @ApiProperty()
  @IsArray()
  readonly features: string[];
}
