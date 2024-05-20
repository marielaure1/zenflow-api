import { Controller, Body, Patch, Param } from '@nestjs/common';
import { UsersService } from '@modules/users/users.service';
import { CreateUserDto } from '@modules/users/dto/create-user.dto';
import { UpdateUserPasswordDto } from '@modules/users/dto/update-user-password.dto';
import { UpdateUserEmailDto } from '@modules/users/dto/update-user-email.dto';
import { User } from '@modules/users/entities/user.entity';
import { AppController } from '@modules/app.controller';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController extends AppController<UsersService, User, CreateUserDto, CreateUserDto>{
  constructor(
      private readonly usersService: UsersService
  ) {
      super(usersService, "users");
  }

  @Patch('email/:id')
  updateEmail(@Param('id') id: string, @Body() UpdateUserEmailDto: UpdateUserEmailDto) {
    return this.usersService.updateEmail(id, UpdateUserEmailDto);
  }

  @Patch('password/:id')
  updatePassword(@Param('id') id: string, @Body() UpdateUserPasswordDto: UpdateUserPasswordDto) {
    return this.usersService.updatePassword(id, UpdateUserPasswordDto);
  }
}