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
  // @Roles('admin')
  async create(@Body() createCustomerDto: CreateCustomerDto, @Res() res: Response) {
    return super.create(createCustomerDto, res);
  }

  @Get()
  // @Roles('admin')
  async findAll(@Res() res: Response) {
    return super.findAll(res);
  }

  @Get("me")
  @UseGuards(AuthGuard)
  async findMe(@Res() res: Response, @Req() req: Request) {

    const userReq = req['user'];
    const user = await this.usersService.findOneByFirebaseUid(userReq.uid);
    const customer = await this.customersService.findOneByUser(user._id);

    return this.responsesHelper.getResponse({
      res,
      path: "findMe",
      method: "Get",
      code: HttpStatus.OK,
      subject: "me",
      data: { user, customer }
    });
  } 
 
  // @Get(':id')
  // // @Roles('admin')
  // // @Ownership()
  // async findOne(@Param('id') id: string, @Res() res: Response) {
  //   return super.findOne(id, res);
  // }

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
