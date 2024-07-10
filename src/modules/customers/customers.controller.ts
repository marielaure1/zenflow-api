import { Controller, Post, Body, Res, HttpStatus, Param, Get, Put, Delete, Req, UseGuards } from '@nestjs/common';
import { CustomersService } from '@modules/customers/customers.service';
import { CreateCustomerDto } from '@modules/customers/dto/create-customer.dto';
import { UpdateCustomerDto } from '@modules/customers/dto/update-customer.dto';
import { CustomersStripeService } from '@providers/services/stripe/services/customers.stripe.service';
import { CreateAuthDto } from '@modules/users/dto/create-auth-customer.dto';
import { Customer, CustomerDocument } from '@modules/customers/entities/customer.entity';
import { AppController } from '@modules/app.controller';
import { ApiTags } from '@nestjs/swagger';
import { Response } from "express";
import { UsersService } from '@modules/users/users.service';
// import { FirebaseService } from '@providers/services/firebase/firebase.service';
import ResponsesHelper from "@helpers/responses.helpers";
import {AuthGuard} from "@guards/auth.guard";
import RoleEnum from '@enums/role.enum';
import { Roles, ROLES_KEY } from '@decorators/roles.decorator';
import { UpdateAuthDto } from '@modules/users/dto/update-auth-customer.dto';
import { UpdateUserDto } from '@modules/users/dto/update-user.dto';
import { Ownership } from '@decorators/ownership.decorator';
import { log } from 'console';
import { SupabaseService } from '@providers/services/supabase/supabase.service';
// import { Roles } from '@decorators/roles.decorator';
// import { Ownership } from '@decorators/ownership.decorator';
// import { log } from 'console';

@ApiTags('customers')
@Controller('customers')
export class CustomersController extends AppController<CustomerDocument, CreateCustomerDto, UpdateCustomerDto>{

  constructor(
      private readonly customersService: CustomersService,
      private readonly usersService: UsersService,
      private readonly supabaseService: SupabaseService,
      private readonly customersStripeService: CustomersStripeService,
  ) {
      super(customersService, "customers");
      this.responsesHelper = new ResponsesHelper();
  }


  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto, @Res() res: Response) {
    return super.create(createCustomerDto, res);
  }

  @Get()
  async findAll(@Res() res: Response) {
    return super.findAll(res);
  }

  @Post("register")
  async register(@Body() createAuthDto :CreateAuthDto, @Res() res: Response){
    try {
      console.log(createAuthDto);
      
      const user = await this.usersService.create(createAuthDto);
      const stripeCustomer = await this.customersStripeService.createCustomer({name: `${createAuthDto.firstName} ${createAuthDto.lastName}`});
      const customers = await this.customersService.create({user, stripeCustomerId: stripeCustomer.id, ...createAuthDto});
      
      return this.responsesHelper.getResponse({
        res,
        path: "create",
        method: "Post",
        code: HttpStatus.CREATED,
        subject: "auth",
        data: {
          user,
          stripeCustomer,
          customers
        }
      });
    } catch (error) {
      console.error("AuthController > register : ", error);

      return this.responsesHelper.getResponse({
        res,
        path: "register",
        method: "Post",
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        subject: "auth",
        data: error.message
      });
    }
  }
  
  @Get("me")
  async findMe(@Res() res: Response, @Req() req: Request) {
    const customer = req['user_supabase'];

    return this.responsesHelper.getResponse({
      res,
      path: "findMe",
      method: "Get",
      code: HttpStatus.OK,
      subject: "me",
      data: { customer }
    });
  } 
 
  @Put("me")
  @UseGuards(AuthGuard)
  // @Roles(RoleEnum.ADMIN)
  async updateMe(@Res() res: Response, @Req() req: Request, @Body() updateAuthDto: UpdateAuthDto) {

    const customer = req['user_supabase'];
    
    try {
      const result = await this.customersService.update(customer._id, updateAuthDto);
      const data = await this.customersService.findWhere({
        where: {
          ownerId: customer.id.toString(),
          schema: updateAuthDto.schema,
        },
        sort: "position"
      })

      return this.responsesHelper.getResponse({
        res,
        path: "updateMe",
        method: "Put",
        code: HttpStatus.OK,
        subject: "customer",
        data: data,
      });
    } catch (error) {
      console.error('CustomerController > updateMe : ', error);
      return this.responsesHelper.getResponse({
        res,
        path: "updateMe",
        method: "Put",
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        subject: "customer",
        data: error.message,
      });
    }
  }

  // @Put("me/email")
  // @UseGuards(AuthGuard)
  // // @Roles(RoleEnum.ADMIN)
  // async updateMeEmail(@Res() res: Response, @Req() req: Request, @Body() updateAuthDto: UpdateAuthDto) {

  //   const user = req['user'];
  //   const customer = req['customer'];
    
  //   try {
  //     const userData = await this.usersService.findOne(user._id);
  //     const result = await this.firebaseService.updateEmailUser(userData.uid, updateAuthDto.email);

  //     return this.responsesHelper.getResponse({
  //       res,
  //       path: "updateMeEmail",
  //       method: "Put",
  //       code: HttpStatus.OK,
  //       subject: "customer",
  //       data: result,
  //     });
  //   } catch (error) {
  //     console.error('CustomerController > updateMeEmail : ', error);
  //     return this.responsesHelper.getResponse({
  //       res,
  //       path: "updateMeEmail",
  //       method: "Put",
  //       code: HttpStatus.INTERNAL_SERVER_ERROR,
  //       subject: "customer",
  //       data: error.message,
  //     });
  //   }
  // }

  // @Put("me/password")
  // @UseGuards(AuthGuard)
  // // @Roles(RoleEnum.ADMIN)
  // async updateMePassword(@Res() res: Response, @Req() req: Request, @Body() updateAuthDto: UpdateAuthDto) {
  //   const user = req['user'];

  //   console.log(user);
    
  //   // const customer = req['customer'];
  //   const result = 1;
  //   try {
  //     // const userData = await this.usersService.findOne(user._id);
  //     // const result = await this.firebaseService.updatePasswordUser(userData.uid, updateAuthDto.password);
      
  //     return this.responsesHelper.getResponse({
  //       res,
  //       path: "updateMePassword",
  //       method: "Put",
  //       code: HttpStatus.OK,
  //       subject: "customer",
  //       data: result,
  //     });
  //   } catch (error) {
  //     console.error('CustomerController > updateMePassword : ', error);
  //     return this.responsesHelper.getResponse({
  //       res,
  //       path: "updateMePassword",
  //       method: "Put",
  //       code: HttpStatus.INTERNAL_SERVER_ERROR,
  //       subject: "customer",
  //       data: error.message,
  //     });
  //   }
  // }

  // @Put(':id')
  // // @Roles('admin')
  // async update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto, @Res() res: Response) {
  //   return super.update(id, updateCustomerDto, res);
  // }

  // @Delete(':id')
  // // @Roles('admin')
  // async remove(@Param('id') id: string, @Res() res: Response) {
  //   try {

  //     const isFind = await this.customersService.findOne(id);
      
  //     const remove = await this.customersService.remove(id);

  //     const isFindUsers = await this.usersService.findOne(isFind?.user?._id?.toString());
  //     const removeUsers = await this.usersService.remove(isFind?.user?._id?.toString());

  //     const isFindFirebaseUsers = await this.firebaseService.getUser(isFind?.user["uid"]);
  //     const removeFirebaseUsers = await this.firebaseService.deleteUser(isFind?.user["uid"]);

  //     return this.responsesHelper.getResponse({
  //       res,
  //       path: "remove",
  //       method: "Delete",
  //       code: HttpStatus.OK,
  //       subject: "customers/users",
  //       data: { remove, removeUsers, removeFirebaseUsers }
  //     });
  //   } catch (error) {
  //     console.error("CustomersController > remove : ", error);
  //     return this.responsesHelper.getResponse({
  //       res,
  //       path: "remove",
  //       method: "Delete",
  //       code: HttpStatus.INTERNAL_SERVER_ERROR,
  //       subject: "customers/users",
  //       data: error.message
  //     });
  //   }
  // }
}
