import { CustomFieldValueDto } from '@dtos/custom-field-value.dto';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsEmail, IsString, IsOptional, IsObject, ValidateNested, IsNumber, IsDate } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiPropertyOptional({ description: 'The society of the client' })
  @IsOptional()
  @IsString()
  society?: string;

  @ApiProperty({ description: 'The first name of the client' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'The last name of the client' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'The email of the client' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The phone number of the client' })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ description: 'The address of the client' })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ description: 'The status of the client' })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({ description: 'The owner ID of the client' })
  @IsString()
  @IsNotEmpty()
  ownerId: string;

  @ApiPropertyOptional({ description: 'The last contact date of the client' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  lastContactDate?: Date;

  @ApiPropertyOptional({ description: 'The market segment of the client' })
  @IsOptional()
  @IsString()
  marketSegment?: string;

  @ApiPropertyOptional({ description: 'The needs of the client' })
  @IsOptional()
  @IsString()
  needs?: string;

  @ApiPropertyOptional({ description: 'The lead source of the client' })
  @IsOptional()
  @IsString()
  leadSource?: string;

  @ApiPropertyOptional({ description: 'The company size of the client' })
  @IsOptional()
  @IsString()
  companySize?: string;

  @ApiPropertyOptional({ description: 'The estimated budget of the client' })
  @IsOptional()
  @IsNumber()
  estimatedBudget?: number;

  @ApiPropertyOptional({ description: 'The custom field values of the client', type: CustomFieldValueDto })
  @IsOptional()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => CustomFieldValueDto)
  customFieldValues?: CustomFieldValueDto;
}
