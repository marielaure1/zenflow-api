import { PartialType } from '@nestjs/swagger';
import { CreatePermissionsUserDto } from '@modules/permissions-users/dto/create-permissions-user.dto';

export class UpdatePermissionsUserDto extends PartialType(CreatePermissionsUserDto) {}
