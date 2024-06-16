import { IsString, IsNotEmpty, IsOptional, IsObject, IsArray, ValidateNested, IsDate, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class CreateCustomFieldDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsOptional()
  @IsArray()
  options?: Array<Object>;

  @IsString()
  @IsOptional()
  position?: number;

  @IsString()
  schema: string;

  @IsOptional()
  @IsArray()
  schemaIds?: Types.ObjectId[];
}

