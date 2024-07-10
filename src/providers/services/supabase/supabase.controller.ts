import { Body, Controller, HttpException, HttpStatus, Post, Res } from "@nestjs/common";
import { UsersService } from '@modules/users/users.service';
import { CustomersStripeService } from '@providers/services/stripe/services/customers.stripe.service';
import { CustomersService } from '@modules/customers/customers.service';
import { CreateAuthDto } from '@modules/users/dto/create-auth-customer.dto';
import { log } from "console";
import UserStatut from "@modules/users/enum/user-statut.enum";
import RoleEnum from "@enums/role.enum";

@Controller('supabase')
export class SupabaseController {
  constructor(
    private readonly usersService: UsersService,
    private readonly customersService: CustomersService,
    private readonly customersStripeService: CustomersStripeService
  ) {}

  @Post("webhook")
  async webhook(@Body() data: any) {
    const { type, record } = data;
    
    try {
      switch (type) {
        case 'INSERT':
          console.log("INSERT event");
          let createAuthDto = {
            lastName: record.raw_user_meta_data.lastName,
            firstName: record.raw_user_meta_data.firstName,
            uid: record.id,
            role: record?.role ? record?.role : RoleEnum.USER
          }
          
          let user = await this.usersService.create({status: UserStatut.VERIFIED, role: createAuthDto?.role, uid: createAuthDto.uid});
          let stripeCustomer = await this.customersStripeService.createCustomer({name: `${createAuthDto.firstName} ${createAuthDto.lastName}`});
          let customers = await this.customersService.create({user, stripeCustomerId: stripeCustomer.id, ...createAuthDto});

          console.log(customers);
          
          break;
        case 'UPDATE':
          console.log("UPDATE event");
          // const user = await this.usersService.create({ uid: record.uid, ...record });

          // console.log(user);
          
          break;
        case 'DELETE':
          console.log("DELETE event");
          // await this.usersService.remove(record.id);
          //  stripeCustomer = await this.customersStripeService.createCustomer({ name: `${record.firstName} ${record.lastName}`, email: record.email });
          // const constcustomer = await this.customersService.create({ user: user._id, stripeCustomerId: stripeCustomer.id, ...record });
          break;
        default:
          throw new HttpException('Unsupported event type', HttpStatus.BAD_REQUEST);
      }
      return { status: 'success' };
    } catch (error) {
      console.error('Error processing webhook:', error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
