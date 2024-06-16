import { CustomFieldValueDto } from '@dtos/custom-field-value.dto';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsEmail, IsString, IsOptional, IsObject, ValidateNested } from 'class-validator';

export class CreateClientDto {
  @IsOptional()
  @IsString()
  society?: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

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

  @IsString()
  @IsNotEmpty()
  ownerId: string;

  @IsOptional()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => CustomFieldValueDto)
  customFields?: CustomFieldValueDto;
}
