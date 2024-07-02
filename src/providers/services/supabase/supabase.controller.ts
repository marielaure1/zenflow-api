import { Body, Controller, HttpException, HttpStatus, Post, Res } from "@nestjs/common";
import { UsersService } from '@modules/users/users.service';
import { CustomersStripeService } from '@providers/services/stripe/services/customers.stripe.service';
import { CustomersService } from '@modules/customers/customers.service';
import { CreateAuthDto } from '@modules/users/dto/create-auth-customer.dto';
import { log } from "console";

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
        console.log(record);
        
          // const user = await this.usersService.create({ uid: record.uid, ...record });
          // const stripeCustomer = await this.customersStripeService.createCustomer();
          // const customer = await this.customersService.create();
          break;
        case 'UPDATE':
          console.log("UPDATE event");
          const user = await this.usersService.create({ uid: record.uid, ...record });

          console.log(user);
          
          break;
        case 'DELETE':
          console.log("DELETE event");
          await this.usersService.remove(record.id);
          const stripeCustomer = await this.customersStripeService.createCustomer({ name: `${record.firstName} ${record.lastName}`, email: record.email });
          const customer = await this.customersService.create({ user: user._id, stripeCustomerId: stripeCustomer.id, ...record });
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
