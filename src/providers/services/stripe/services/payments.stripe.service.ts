import { Customer } from '@modules/customers/entities/customer.entity';
import { Injectable, Inject } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentsStripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    const stripeApiKey = this.configService.get<string>('STRIPE_API_KEY');
    this.stripe = new Stripe(stripeApiKey, {
      apiVersion: '2024-04-10',
    });
  }

  async createCheckoutSession(sessionData: Stripe.Checkout.SessionCreateParams): Promise<Stripe.Checkout.Session> {
    return this.stripe.checkout.sessions.create(sessionData);
  }

  async createEphemeralKey(customerId) {
    return this.stripe.ephemeralKeys.create(
      {customer: customerId},
      {apiVersion: '2024-04-10'}
    );
  }

  async createPaymentIntent(paymentIntentData: Stripe.PaymentIntentCreateParams): Promise<Stripe.PaymentIntent> {
    const paymentIntent = await this.stripe.paymentIntents.create(paymentIntentData);
    return paymentIntent;
  }

  async findPaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
    const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);
    return paymentIntent;
  }

  async updatePaymentIntent(paymentIntentId: string, updateData: Stripe.PaymentIntentUpdateParams): Promise<Stripe.PaymentIntent> {
    const paymentIntent = await this.stripe.paymentIntents.update(paymentIntentId, updateData);
    return paymentIntent;
  }

  async cancelPaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
    const canceledPaymentIntent = await this.stripe.paymentIntents.cancel(paymentIntentId);
    return canceledPaymentIntent;
  }
}
