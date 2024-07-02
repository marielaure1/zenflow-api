import { CustomFieldValueDto } from '@dtos/custom-field-value.dto';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsEmail, IsString, IsOptional, IsObject, ValidateNested, IsNumber, IsDate } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProspectDto {
  @ApiPropertyOptional({ description: 'The society of the prospect' })
  @IsOptional()
  @IsString()
  society?: string;

  @ApiProperty({ description: 'The first name of the prospect' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'The last name of the prospect' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'The email of the prospect' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The phone number of the prospect' })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ description: 'The address of the prospect' })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ description: 'The status of the prospect' })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({ description: 'The owner ID of the prospect' })
  @IsString()
  @IsNotEmpty()
  ownerId: string;

  @ApiPropertyOptional({ description: 'The last contact date of the prospect' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  lastContactDate?: Date;

  @ApiPropertyOptional({ description: 'The market segment of the prospect' })
  @IsOptional()
  @IsString()
  marketSegment?: string;

  @ApiPropertyOptional({ description: 'The needs of the prospect' })
  @IsOptional()
  @IsString()
  needs?: string;

  @ApiPropertyOptional({ description: 'The lead source of the prospect' })
  @IsOptional()
  @IsString()
  leadSource?: string;

  @ApiPropertyOptional({ description: 'The company size of the prospect' })
  @IsOptional()
  @IsString()
  companySize?: string;

  @ApiPropertyOptional({ description: 'The estimated budget of the prospect' })
  @IsOptional()
  @IsNumber()
  estimatedBudget?: number;

  @ApiPropertyOptional({ description: 'The custom field values of the prospect', type: CustomFieldValueDto })
  @IsOptional()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => CustomFieldValueDto)
  customFieldValues?: CustomFieldValueDto;
}
