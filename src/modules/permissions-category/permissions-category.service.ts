import { Injectable } from '@nestjs/common';
import { CreatePermissionsCategoryDto } from '@modules/permissions-category/dto/create-permissions-category.dto';
import { UpdatePermissionsCategoryDto } from '@modules/permissions-category/dto/update-permissions-category.dto';

@Injectable()
export class PermissionsCategoryService {
  create(createPermissionsCategoryDto: CreatePermissionsCategoryDto) {
    return 'This action adds a new permissionsCategory';
  }

  findAll() {
    return `This action returns all permissionsCategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} permissionsCategory`;
  }

  update(id: number, updatePermissionsCategoryDto: UpdatePermissionsCategoryDto) {
    return `This action updates a #${id} permissionsCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} permissionsCategory`;
  }
}
