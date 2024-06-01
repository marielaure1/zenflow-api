import { IsNotEmpty, IsOptional, IsString, IsEnum } from 'class-validator';
import { Types } from 'mongoose';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  projectId: Types.ObjectId;

  @IsOptional()
  @IsEnum(['pending', 'in-progress', 'completed'])
  status?: string;
}