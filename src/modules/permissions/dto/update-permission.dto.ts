import { PartialType } from '@nestjs/swagger';
import { CreatePermissionDto } from '@modules/permissions/dto/create-permission.dto';

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {}
