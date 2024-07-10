import { Injectable } from '@nestjs/common';
import { SubscriptionsService } from '@modules/subscriptions/subscriptions.service';

@Injectable()
export class WebhookStripeService {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  async handleEvent(event: any) {
    switch (event.type) {
      case 'invoice.payment_failed':
        const subscriptionId = event.data.object.subscription;
        const customerId = event.data.object.customer;
        return { subscriptionId, customerId, failed: true };
      default:
        return { received: true };
    }
  }
}
