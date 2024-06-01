import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { StripeService } from '@providers/services/stripe/stripe.service';

@Injectable()
export class SubscriptionsStripeService extends StripeService {

  async createSubscription(subscriptionData: Stripe.SubscriptionCreateParams): Promise<Stripe.Subscription> {
    const stripe = this.getStripeInstance();
    const subscription = await stripe.subscriptions.create(subscriptionData);
    return subscription;
  }

  async findSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
    const stripe = this.getStripeInstance();
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    return subscription;
  }

  async updateSubscription(subscriptionId: string, updateData: Stripe.SubscriptionUpdateParams): Promise<Stripe.Subscription> {
    const stripe = this.getStripeInstance();
    const subscription = await stripe.subscriptions.update(subscriptionId, updateData);
    return subscription;
  }

  async cancelSubscription(subscriptionId: string): Promise<Stripe.SubscriptionCancelParams > {
    const stripe = this.getStripeInstance();
    const canceledSubscription = await stripe.subscriptions.cancel(subscriptionId);
    return canceledSubscription;
  }
}
