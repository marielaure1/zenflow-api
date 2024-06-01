import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export class CreateTaskCommentDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  taskId: string;

  @IsString()
  @IsNotEmpty()
  authorId: string;

  @IsOptional()
  @IsArray()
  attachments?: string[];
}
