import { IsNotEmpty, IsEmail, IsString, IsOptional, IsDate, IsNumber, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { Prospect } from '../entities/prospect.entity';
import { CustomFieldDto } from '@dtos/custom-field.dto';

export class CreateProspectDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  lastContactDate?: Date;

  @IsOptional()
  @IsString()
  marketSegment?: string;

  @IsOptional()
  @IsString()
  needs?: string;

  @IsOptional()
  @IsString()
  leadSource?: string;

  @IsOptional()
  @IsString()
  companySize?: string;

  @IsOptional()
  @IsNumber()
  estimatedBudget?: number;

  @IsOptional()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => CustomFieldDto)
  customFields?: CustomFieldDto;
}
