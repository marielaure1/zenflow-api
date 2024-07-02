import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseGuards, Req, Put } from '@nestjs/common';
import { UsersService } from '@modules/users/users.service';
import { CreateUserDto } from '@modules/users/dto/create-user.dto';
import { UpdateUserDto } from '@modules/users/dto/update-user.dto';
import { User, UserDocument } from '@modules/users/entities/user.entity';
import { AppController } from '@modules/app.controller';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Response, Request } from "express";
import { AuthGuard } from '@guards/auth.guard';
import RoleEnum from '@enums/role.enum';

@ApiTags('users')
@Controller('users')
export class UsersController extends AppController<UserDocument, CreateUserDto, UpdateUserDto>{
  
  constructor(
      private readonly usersService: UsersService
  ) {
      super(usersService, "users");
  }

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBearerAuth()
  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    let { role } = createUserDto;

    if(!role){
      createUserDto.role = RoleEnum.USER;
    }

    return super.create(createUserDto, res);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  @ApiResponse({ status: 404, description: 'Users not found.' })
  @Get()
  async findAll(@Res() res: Response) {
    return super.findAll(res);
  }

  @ApiOperation({ summary: 'Get a user by id' })
  @ApiResponse({ status: 200, description: 'Return a user.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    return super.findOne(id, res);
  }

  @ApiOperation({ summary: 'Update a user by id' })
  @ApiResponse({ status: 200, description: 'The user has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Res() res: Response) {
    return super.update(id, updateUserDto, res);
  }

  @ApiOperation({ summary: 'Delete a user by id' })
  @ApiResponse({ status: 200, description: 'The user has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    return super.remove(id, res);
  }
}
