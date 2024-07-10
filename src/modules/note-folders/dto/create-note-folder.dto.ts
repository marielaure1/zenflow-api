import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteFolderDto {
  @ApiProperty({ description: 'The title of the folder' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'The description of the folder' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'The parent folder ID of the folder' })
  @IsOptional()
  @IsString()
  parentId?: string;

  @ApiProperty({ description: 'The owner ID of the note folder' })
  @IsString()
  @IsNotEmpty()
  ownerId: string;

  @ApiProperty({ description: 'The order of the folder on the hierarchy of folder' })
  @IsOptional()
  @IsNumber()
  order?: number;
}
