import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PermissionsCategoryService } from '@modules/permissions-category/permissions-category.service';
import { CreatePermissionsCategoryDto } from '@modules/permissions-category/dto/create-permissions-category.dto';
import { UpdatePermissionsCategoryDto } from '@modules/permissions-category/dto/update-permissions-category.dto';

@Controller('permissions-category')
export class PermissionsCategoryController {
  constructor(private readonly permissionsCategoryService: PermissionsCategoryService) {}

  @Post()
  create(@Body() createPermissionsCategoryDto: CreatePermissionsCategoryDto) {
    return this.permissionsCategoryService.create(createPermissionsCategoryDto);
  }

  @Get()
  findAll() {
    return this.permissionsCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionsCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePermissionsCategoryDto: UpdatePermissionsCategoryDto) {
    return this.permissionsCategoryService.update(+id, updatePermissionsCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionsCategoryService.remove(+id);
  }
}
