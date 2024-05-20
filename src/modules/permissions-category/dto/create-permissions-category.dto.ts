import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePermissionsCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
