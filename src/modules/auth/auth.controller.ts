import { CustomersService } from '@modules/customers/customers.service';
import { CreateCustomerDto } from '@modules/customers/dto/create-customer.dto';
import { Controller, Get, Post, Body, Res, HttpStatus, Param} from '@nestjs/common';
import { FirebaseService } from '@providers/services/firebase/firebase.service';
import { CustomersStripeService } from '@providers/services/stripe/services/customers.stripe.service';
import { CreateUserDto } from '@modules/users/dto/create-user.dto';
import { CreateAuthDto } from '@modules/auth/dto/create-auth-customer.dto';
import { Response } from 'express';
import { UsersService } from '@modules/users/users.service';

import ResponsesHelper from "@helpers/responses.helpers";

@Controller('auth')
export class AuthController {
  public responsesHelper: ResponsesHelper;
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly usersService: UsersService,
    private readonly customersService: CustomersService,
    private readonly customersStripeService: CustomersStripeService
  ) {
    this.responsesHelper = new ResponsesHelper();
  }

  @Post("register")
  async register(@Body() CreateAuthDto :CreateAuthDto, @Res() res: Response){
    try {
      
      const firestore = await this.firebaseService.createUser(CreateAuthDto);
      const user = await this.usersService.create({uid: firestore?.uid, ...CreateAuthDto});
      const stripeCustomer = await this.customersStripeService.createCustomer({name: `${CreateAuthDto.firstName} ${CreateAuthDto.lastName}`, email: CreateAuthDto.email});
      const customers = await this.customersService.create({user, stripeCustomerId: stripeCustomer.id, ...CreateAuthDto});
      
      return this.responsesHelper.getResponse({
        res,
        path: "create",
        method: "Post",
        code: HttpStatus.CREATED,
        subject: "auth",
        data: {
          firestore,
          user,
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

  @Get("verif-token/:token")
  async verifToken(@Param('token') token: string, @Res() res: Response){
    try {
    
      const isTokenExpired = await this.firebaseService.verifyToken(token)
      return this.responsesHelper.getResponse({
        res,
        path: "create",
        method: "Post",
        code: HttpStatus.CREATED,
        subject: "auth",
        data: {
          isTokenExpired
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

  
 
}
