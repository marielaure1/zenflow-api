import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PermissionsUsersService } from '@modules/permissions-users/permissions-users.service';
import { CreatePermissionsUserDto } from '@modules/permissions-users/dto/create-permissions-user.dto';
import { UpdatePermissionsUserDto } from '@modules/permissions-users/dto/update-permissions-user.dto';

@Controller('permissions-users')
export class PermissionsUsersController {
  constructor(private readonly permissionsUsersService: PermissionsUsersService) {}

  @Post()
  create(@Body() createPermissionsUserDto: CreatePermissionsUserDto) {
    return this.permissionsUsersService.create(createPermissionsUserDto);
  }

  @Get()
  findAll() {
    return this.permissionsUsersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionsUsersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePermissionsUserDto: UpdatePermissionsUserDto) {
    return this.permissionsUsersService.update(+id, updatePermissionsUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionsUsersService.remove(+id);
  }
}
