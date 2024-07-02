import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskCategorieDto {
  @ApiProperty({ description: 'The name of the task category' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The description of the task category' })
  @IsString()
  @IsNotEmpty()
  description: string;
}
