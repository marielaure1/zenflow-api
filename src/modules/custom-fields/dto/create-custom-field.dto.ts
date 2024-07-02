import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';
import { Types } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCustomFieldDto {
  @ApiProperty({ description: 'The name of the custom field' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The type of the custom field' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiPropertyOptional({ description: 'The options for the custom field', type: [Object] })
  @IsOptional()
  @IsArray()
  options?: Array<Object>;

  @ApiPropertyOptional({ description: 'The position of the custom field' })
  @IsOptional()
  @IsString()
  position?: number;

  @ApiProperty({ description: 'The schema of the custom field' })
  @IsString()
  @IsNotEmpty()
  schema: string;

  @ApiProperty({ description: 'The owner ID of the custom field' })
  @IsString()
  @IsNotEmpty()
  ownerId: string;

  @ApiPropertyOptional({ description: 'The schema IDs associated with the custom field', type: [Types.ObjectId] })
  @IsOptional()
  @IsArray()
  schemaIds?: Types.ObjectId[];
}
