import { Injectable } from '@nestjs/common';
import { CreatePermissionsUserDto } from '@modules/permissions-users/dto/create-permissions-user.dto';
import { UpdatePermissionsUserDto } from '@modules/permissions-users/dto/update-permissions-user.dto';

@Injectable()
export class PermissionsUsersService {
  create(createPermissionsUserDto: CreatePermissionsUserDto) {
    return 'This action adds a new permissionsUser';
  }

  findAll() {
    return `This action returns all permissionsUsers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} permissionsUser`;
  }

  update(id: number, updatePermissionsUserDto: UpdatePermissionsUserDto) {
    return `This action updates a #${id} permissionsUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} permissionsUser`;
  }
}
