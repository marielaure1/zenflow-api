import { IsString, IsNotEmpty, IsObject, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CustomFieldValueDto } from '@dtos/custom-field-value.dto';

export class CreateProjectDto {
  @ApiProperty({ description: 'The name of the project' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The description of the project' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({ description: 'The picture URL of the project' })
  @IsString()
  @IsOptional()
  picture?: string;

  @ApiProperty({ description: 'The ID of the project owner' })
  @IsString()
  @IsNotEmpty()
  ownerId: string;

  @ApiPropertyOptional({ description: 'The ID of the team associated with the project' })
  @IsString()
  @IsOptional()
  teamId?: string;

  @ApiPropertyOptional({ description: 'The priority level of the project' })
  @IsString()
  @IsOptional()
  priority?: string;

  @ApiPropertyOptional({ description: 'The status of the project' })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional({ description: 'The IDs of the milestones associated with the project', type: [String] })
  @IsOptional()
  @IsArray()
  milestoneIds?: string[];

  @ApiPropertyOptional({ description: 'The IDs of the notes associated with the project', type: [String] })
  @IsOptional()
  @IsArray()
  noteIds?: string[];

  @ApiPropertyOptional({ description: 'The ID of the client associated with the project' })
  @IsString()
  @IsOptional()
  clientId?: string;

  @ApiPropertyOptional({ description: 'The IDs of the task categories associated with the project', type: [String] })
  @IsOptional()
  @IsArray()
  taskCategoryId?: string[];

  @ApiPropertyOptional({ description: 'The IDs of the categories associated with the project', type: [String] })
  @IsOptional()
  @IsArray()
  categoryIds?: string[];

  @ApiPropertyOptional({ description: 'Custom field values associated with the project', type: CustomFieldValueDto })
  @IsOptional()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => CustomFieldValueDto)
  customFieldValues?: CustomFieldValueDto;
}
