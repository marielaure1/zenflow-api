import { IsString, IsNotEmpty, IsObject, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CustomFieldDto } from '@dtos/custom-field.dto';
import { MilestoneDto } from '@dtos/milestones.dto'; 
import { CustomFieldValueDto } from '@dtos/custom-field-value.dto';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  picture?: string;

  @IsString()
  @IsNotEmpty()
  ownerId: string;

  @IsString()
  @IsOptional()
  teamId?: string;

  @IsString()
  @IsOptional()
  priority?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsOptional()
  @IsArray()
  milestoneIds?: string[];

  @IsOptional()
  @IsArray()
  noteIds?: string[];

  @IsString()
  @IsOptional()
  clientId?: string;

  @IsOptional()
  @IsArray()
  taskCategoryId?: string[];

  @IsOptional()
  @IsArray()
  categoryIds?: string[];

  @IsOptional()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => CustomFieldValueDto)
  customFieldValues?: CustomFieldValueDto;
}