import { PartialType } from '@nestjs/swagger';
import { CreatePermissionsCategoryDto } from '@modules/permissions-category/dto/create-permissions-category.dto';

export class UpdatePermissionsCategoryDto extends PartialType(CreatePermissionsCategoryDto) {}
