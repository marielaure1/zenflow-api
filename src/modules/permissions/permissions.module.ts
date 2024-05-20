import { Module } from '@nestjs/common';
import { PermissionsService } from '@modules/permissions/permissions.service';
import { PermissionsController } from '@modules/permissions/permissions.controller';

@Module({
  controllers: [PermissionsController],
  providers: [PermissionsService],
})
export class PermissionsModule {}
