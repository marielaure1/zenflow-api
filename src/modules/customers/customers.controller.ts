import { Controller, Post, Body, Res, HttpStatus, Param, Get, Put, Delete, Req, UseGuards } from '@nestjs/common';
import { CustomersService } from '@modules/customers/customers.service';
import { CreateCustomerDto } from '@modules/customers/dto/create-customer.dto';
import { UpdateCustomerDto } from '@modules/customers/dto/update-customer.dto';
import { Customer, CustomerDocument } from '@modules/customers/entities/customer.entity';
import { AppController } from '@modules/app.controller';
import { ApiTags } from '@nestjs/swagger';
import { Response } from "express";
import { UsersService } from '@modules/users/users.service';
import { FirebaseService } from '@providers/services/firebase/firebase.service';
import ResponsesHelper from "@helpers/responses.helpers";
import {AuthGuard} from "@guards/auth.guard";
import RoleEnum from '@enums/role.enum';
import { Roles, ROLES_KEY } from '@decorators/roles.decorator';
import { UpdateAuthDto } from '@modules/auth/dto/update-auth-customer.dto';
import { UpdateUserDto } from '@modules/users/dto/update-user.dto';
import { Ownership } from '@decorators/ownership.decorator';
import { log } from 'console';
// import { Roles } from '@decorators/roles.decorator';
// import { Ownership } from '@decorators/ownership.decorator';
// import { log } from 'console';

@ApiTags('customers')
@Controller('customers')
export class CustomersController extends AppController<CustomerDocument, CreateCustomerDto, UpdateCustomerDto>{

  constructor(
      private readonly customersService: CustomersService,
      private readonly usersService: UsersService,
      private readonly firebaseService: FirebaseService,
  ) {
      super(customersService, "customers");
      this.responsesHelper = new ResponsesHelper();
  }


  @Post()
  @Roles(RoleEnum.ADMIN)
  async create(@Body() createCustomerDto: CreateCustomerDto, @Res() res: Response) {
    return super.create(createCustomerDto, res);
  }

  @Get()
  // @Roles('admin')
  async findAll(@Res() res: Response) {
    return super.findAll(res);
  }

  @Ownership()
  @UseGuards(AuthGuard)
  @Get("me")
  async findMe(@Res() res: Response, @Req() req: Request) {

    const user = req['user'];
    const customer = req['customer'];

    console.log(user);
    

    return this.responsesHelper.getResponse({
      res,
      path: "findMe",
      method: "Get",
      code: HttpStatus.OK,
      subject: "me",
      data: { user, customer }
    });
  } 
 
  // @Put("me")
  // @UseGuards(AuthGuard)
  // // @Roles(RoleEnum.ADMIN)
  // async updateMe(@Res() res: Response, @Req() req: Request, @Body() updateAuthDto: UpdateAuthDto) {

  //   const user = req['user'];
  //   const customer = req['customer'];
    
  //   try {
  //     const result = await this.customersService.update(customer._id, updateAuthDto);
  //     const data = await this.customersService.findWhere({
  //       where: {
  //         ownerId: customer._id.toString(),
  //         schema: updateAuthDto.schema,
  //       },
  //       sort: "position"
  //     })

  //     return this.responsesHelper.getResponse({
  //       res,
  //       path: "updateMe",
  //       method: "Put",
  //       code: HttpStatus.OK,
  //       subject: "customer",
  //       data: data,
  //     });
  //   } catch (error) {
  //     console.error('CustomerController > updateMe : ', error);
  //     return this.responsesHelper.getResponse({
  //       res,
  //       path: "updateMe",
  //       method: "Put",
  //       code: HttpStatus.INTERNAL_SERVER_ERROR,
  //       subject: "customer",
  //       data: error.message,
  //     });
  //   }
  // }

  @Put("me/email")
  @UseGuards(AuthGuard)
  // @Roles(RoleEnum.ADMIN)
  async updateMeEmail(@Res() res: Response, @Req() req: Request, @Body() updateAuthDto: UpdateAuthDto) {

    const user = req['user'];
    const customer = req['customer'];
    
    try {
      const userData = await this.usersService.findOne(user._id);
      const result = await this.firebaseService.updateEmailUser(userData.uid, updateAuthDto.email);

      return this.responsesHelper.getResponse({
        res,
        path: "updateMeEmail",
        method: "Put",
        code: HttpStatus.OK,
        subject: "customer",
        data: result,
      });
    } catch (error) {
      console.error('CustomerController > updateMeEmail : ', error);
      return this.responsesHelper.getResponse({
        res,
        path: "updateMeEmail",
        method: "Put",
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        subject: "customer",
        data: error.message,
      });
    }
  }

  @Put("me/password")
  @UseGuards(AuthGuard)
  // @Roles(RoleEnum.ADMIN)
  async updateMePassword(@Res() res: Response, @Req() req: Request, @Body() updateAuthDto: UpdateAuthDto) {
    const user = req['user'];

    console.log(user);
    
    // const customer = req['customer'];
    const result = 1;
    try {
      // const userData = await this.usersService.findOne(user._id);
      // const result = await this.firebaseService.updatePasswordUser(userData.uid, updateAuthDto.password);
      
      return this.responsesHelper.getResponse({
        res,
        path: "updateMePassword",
        method: "Put",
        code: HttpStatus.OK,
        subject: "customer",
        data: result,
      });
    } catch (error) {
      console.error('CustomerController > updateMePassword : ', error);
      return this.responsesHelper.getResponse({
        res,
        path: "updateMePassword",
        method: "Put",
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        subject: "customer",
        data: error.message,
      });
    }
  }

  @Put(':id')
  // @Roles('admin')
  async update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto, @Res() res: Response) {
    return super.update(id, updateCustomerDto, res);
  }

  @Delete(':id')
  // @Roles('admin')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {

      const isFind = await this.customersService.findOne(id);
      
      const remove = await this.customersService.remove(id);

      const isFindUsers = await this.usersService.findOne(isFind?.user?._id?.toString());
      const removeUsers = await this.usersService.remove(isFind?.user?._id?.toString());

      const isFindFirebaseUsers = await this.firebaseService.getUser(isFind?.user["uid"]);
      const removeFirebaseUsers = await this.firebaseService.deleteUser(isFind?.user["uid"]);

      return this.responsesHelper.getResponse({
        res,
        path: "remove",
        method: "Delete",
        code: HttpStatus.OK,
        subject: "customers/users",
        data: { remove, removeUsers, removeFirebaseUsers }
      });
    } catch (error) {
      console.error("CustomersController > remove : ", error);
      return this.responsesHelper.getResponse({
        res,
        path: "remove",
        method: "Delete",
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        subject: "customers/users",
        data: error.message
      });
    }
  }
}
