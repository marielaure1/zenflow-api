import { IsNotEmpty, IsString, IsEnum, IsMongoId } from 'class-validator';
import { PermissionType } from '@modules/permissions/enum/permissions-type.enum';

export class CreatePermissionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsEnum(PermissionType)
  type: PermissionType;

  @IsNotEmpty()
  @IsMongoId()
  permission_category_id: string;
}
