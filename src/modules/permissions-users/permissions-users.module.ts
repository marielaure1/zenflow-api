import { Module } from '@nestjs/common';
import { PermissionsUsersService } from '@modules/permissions-users/permissions-users.service';
import { PermissionsUsersController } from '@modules/permissions-users/permissions-users.controller';

@Module({
  controllers: [PermissionsUsersController],
  providers: [PermissionsUsersService],
})
export class PermissionsUsersModule {}
