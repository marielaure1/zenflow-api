import { Module } from '@nestjs/common';
import { PermissionsCategoryService } from '@modules/permissions-category/permissions-category.service';
import { PermissionsCategoryController } from '@modules/permissions-category/permissions-category.controller';

@Module({
  controllers: [PermissionsCategoryController],
  providers: [PermissionsCategoryService],
})
export class PermissionsCategoryModule {}
