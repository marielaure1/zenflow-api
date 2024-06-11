import { IsString, IsNotEmpty, IsObject, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CustomFieldDto } from '@dtos/custom-field.dto';
import { MilestoneDto } from '@dtos/milestones.dto'; 

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
  @IsNotEmpty()
  teamId: string;

  @IsString()
  @IsOptional()
  priority?: string;

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
  @Type(() => CustomFieldDto)
  customFields?: CustomFieldDto;
}