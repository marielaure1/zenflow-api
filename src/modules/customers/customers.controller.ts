import { Controller, Body, Patch, Put, Delete, Param, HttpStatus } from '@nestjs/common';
import { CustomersService } from '@modules/customers/customers.service';
import { CreateCustomerDto } from '@modules/customers/dto/create-customer.dto';
import { UpdateCustomerDto } from '@modules/customers/dto/update-customer.dto';
import { Customer } from '@modules/customers/entities/customer.entity';
import { AppController } from '@modules/app.controller';
import { ApiTags } from '@nestjs/swagger';
import { Res } from '@nestjs/common';
import { Response } from "express";
import { UsersService } from '@modules/users/users.service';
import { FirebaseService } from '@providers/services/firebase/firebase.service';
import ResponsesHelper from "@helpers/responses.helpers";

@ApiTags('customers')
@Controller('customers')
export class CustomersController extends AppController<CustomersService, Customer, CreateCustomerDto, CreateCustomerDto>{

  constructor(
      private readonly customersService: CustomersService,
      private readonly usersService: UsersService,
      private readonly firebaseService: FirebaseService,
  ) {
      super(customersService, "customers");
      this.responsesHelper = new ResponsesHelper();
  }

  @Delete(':id')
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
