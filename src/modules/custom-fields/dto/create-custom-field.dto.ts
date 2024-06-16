import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';
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

  @IsOptional()
  @IsString()
  position?: number;

  @IsString()
  @IsNotEmpty()
  schema: string;

  @IsString()
  @IsNotEmpty()
  ownerId: string;

  @IsOptional()
  @IsArray()
  schemaIds?: Types.ObjectId[];
}
