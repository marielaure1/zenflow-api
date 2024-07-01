import { Controller, Body, Patch, Param, Res, HttpStatus } from '@nestjs/common';
import { UsersService } from '@modules/users/users.service';
import { CreateUserDto } from '@modules/users/dto/create-user.dto';
import { UpdateUserPasswordDto } from '@modules/users/dto/update-user-password.dto';
import { UpdateUserEmailDto } from '@modules/users/dto/update-user-email.dto';
import { User, UserDocument } from '@modules/users/entities/user.entity';
import { AppController } from '@modules/app.controller';
import { ApiTags } from '@nestjs/swagger';
// import { FirebaseService } from '@providers/services/firebase/firebase.service';
import { Response } from "express";

@ApiTags('users')
@Controller('users')
export class UsersController extends AppController<UserDocument, CreateUserDto, CreateUserDto>{
  
  
  constructor(
    // private readonly firebaseService: FirebaseService,
      private readonly usersService: UsersService
  ) {
      super(usersService, "users");

  }

  // @Patch('email/:id')
  // async updateEmail(@Param('id') id: string, @Body() updateUserEmailDto: UpdateUserEmailDto, @Res() res: Response) {

  //   try {

  //     const isFind = await this.usersService.findOne(id);
  //     const update = await this.usersService.updateEmail(id, updateUserEmailDto);

  //     const isFindFirebaseUsers = await this.firebaseService.getUser(isFind["uid"]);
  //     const updateFirebaseUsers = await this.firebaseService.updateEmailUser(isFind["uid"], updateUserEmailDto);

  //     return this.responsesHelper.getResponse({
  //       res,
  //       path: "update",
  //       method: "Patch",
  //       code: HttpStatus.OK,
  //       subject: "users",
  //       data: { update, updateFirebaseUsers }
  //     });
  //   } catch (error) {
  //     console.error("UsersController > updateEmail : ", error);
  //     return this.responsesHelper.getResponse({
  //       res,
  //       path: "update",
  //       method: "Patch",
  //       code: HttpStatus.INTERNAL_SERVER_ERROR,
  //       subject: "users",
  //       data: error.message
  //     });
  //   }
  // }

  // @Patch('password/:id')
  // async updatePassword(@Param('id') id: string, @Body() updateUserPasswordDto: UpdateUserPasswordDto, @Res() res: Response) {
  //   try {

  //     const isFind = await this.usersService.findOne(id);
  //     const update = await this.usersService.updatePassword(id, updateUserPasswordDto);
      
  //     return this.responsesHelper.getResponse({
  //       res,
  //       path: "update",
  //       method: "Patch",
  //       code: HttpStatus.OK,
  //       subject: "users",
  //       data: { update }
  //     });
  //   } catch (error) {
  //     console.error("UsersController > updatePassword : ", error);
  //     return this.responsesHelper.getResponse({
  //       res,
  //       path: "update",
  //       method: "Patch",
  //       code: HttpStatus.INTERNAL_SERVER_ERROR,
  //       subject: "users",
  //       data: error.message
  //     });
  //   }
  // }
}