import { IsString, IsNotEmpty, IsOptional, IsObject, IsArray, ValidateNested, IsDate, IsNumber, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { CustomFieldDto } from '@dtos/custom-field.dto';
import { FlagDto } from '@dtos/flag.dto';
import { TimeEntryDto } from '@dtos/time-entry.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ description: 'The title of the task' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'The description of the task' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({ description: 'The ID of the task category' })
  @IsString()
  @IsOptional()
  taskCategoryId?: string;

  @ApiPropertyOptional({ description: 'The ID of the assignee' })
  @IsOptional()
  @IsString()
  assigneeId?: string;

  @ApiPropertyOptional({ description: 'Whether the task is completed' })
  @IsBoolean()
  @IsOptional()
  completed?: boolean;

  @ApiPropertyOptional({ description: 'The due date of the task' })
  @IsOptional()
  @IsDate()
  dueDate?: Date;

  @ApiPropertyOptional({ description: 'The priority of the task' })
  @IsOptional()
  @IsString()
  priority?: string;

  @ApiPropertyOptional({ description: 'Comments on the task' })
  @IsOptional()
  @IsArray()
  comments?: string[];

  @ApiPropertyOptional({ description: 'Flags associated with the task' })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FlagDto)
  flags?: FlagDto[];

  @ApiPropertyOptional({ description: 'Time entries for the task' })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimeEntryDto)
  timeEntries?: TimeEntryDto[];

  @ApiPropertyOptional({ description: 'Custom fields for the task' })
  @IsOptional()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => CustomFieldDto)
  customFields?: Record<string, CustomFieldDto>;

  @ApiPropertyOptional({ description: 'The ID of the parent task' })
  @IsOptional()
  @IsString()
  parentTaskId?: string;

  @ApiPropertyOptional({ description: 'Sub-tasks associated with the task' })
  @IsOptional()
  @IsArray()
  subTasks?: string[];

  @ApiPropertyOptional({ description: 'The section of the task' })
  @IsOptional()
  @IsString()
  section?: string;

  @ApiPropertyOptional({ description: 'The order of the task' })
  @IsOptional()
  @IsNumber()
  order?: number;
}