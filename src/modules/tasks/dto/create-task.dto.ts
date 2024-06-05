import { IsString, IsNotEmpty, IsOptional, IsObject, IsArray, ValidateNested, IsDate, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { CustomFieldDto } from '@dtos/custom-field.dto';
import { FlagDto } from '@dtos/flag.dto';
import { TimeEntryDto } from '@dtos/time-entry.dto';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  projectId?: string;

  @IsOptional()
  @IsString()
  assigneeId?: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsOptional()
  @IsDate()
  dueDate?: Date;

  @IsOptional()
  @IsString()
  priority?: string;

  @IsOptional()
  @IsArray()
  comments?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FlagDto)
  flags?: FlagDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimeEntryDto)
  timeEntries?: TimeEntryDto[];

  @IsOptional()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => CustomFieldDto)
  customFields?: Record<string, CustomFieldDto>;

  @IsOptional()
  @IsString()
  parentTaskId?: string;

  @IsOptional()
  @IsArray()
  subTasks?: string[];

  @IsOptional()
  @IsString()
  section?: string;

  @IsOptional()
  @IsNumber()
  order?: number;
}
