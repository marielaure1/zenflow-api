import { CustomFieldDto } from '@dtos/custom-field.dto';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsEmail, IsString, IsOptional, IsObject, ValidateNested } from 'class-validator';

export class CreateClientDto {
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
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => CustomFieldDto)
  customFields?: CustomFieldDto;
}
