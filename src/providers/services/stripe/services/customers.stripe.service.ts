import { Injectable, Inject } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CustomersStripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    const stripeApiKey = this.configService.get<string>('STRIPE_API_KEY');
    this.stripe = new Stripe(stripeApiKey, {
      apiVersion: '2024-04-10',
    });
  }

  async createCustomer(customerData: Stripe.CustomerCreateParams): Promise<Stripe.Customer> {
    const customer = await this.stripe.customers.create(customerData);
    return customer;
  }

  async findCustomer(customerId: string) {
    const customer = await this.stripe.customers.retrieve(customerId);
    return customer;
  }

  async updateCustomer(customerId: string, updateData: any): Promise<Stripe.Customer> {
    const customer = await this.stripe.customers.update(customerId, updateData);
    return customer;
  }

  async deleteCustomer(customerId: string): Promise<Stripe.DeletedCustomer> {
    const deletedCustomer = await this.stripe.customers.del(customerId);
    return deletedCustomer;
  }
}
