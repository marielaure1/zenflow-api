import { IsString, IsNotEmpty, IsOptional, IsObject, IsArray, ValidateNested, IsDate, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CustomFieldValueDto {
  @IsString()
  @IsNotEmpty()
  customFieldId: string;

  @IsOptional()
  value?: any;
}

