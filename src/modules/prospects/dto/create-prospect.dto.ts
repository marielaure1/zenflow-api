import { IsNotEmpty, IsEmail, IsString, IsOptional, IsDate, IsNumber, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { Prospect } from '../entities/prospect.entity';
import { CustomFieldDto } from '@dtos/custom-field.dto';
import { CustomFieldValueDto } from '@dtos/custom-field-value.dto';

export class CreateProspectDto {
  @IsOptional()
  @IsString()
  society?: string;

  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

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

  @IsString()
  @IsNotEmpty()
  ownerId: string;

  @IsOptional()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => CustomFieldValueDto)
  customFieldValues?: CustomFieldValueDto;
}
