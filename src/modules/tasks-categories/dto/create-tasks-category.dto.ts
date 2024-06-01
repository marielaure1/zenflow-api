import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTaskCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
