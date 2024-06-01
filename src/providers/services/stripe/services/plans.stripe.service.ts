import { Injectable, Inject } from '@nestjs/common';
import Stripe from 'stripe';
import { CreatePlanDto } from '@modules/plans/dto/create-plan.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PlansStripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    const stripeApiKey = this.configService.get<string>('STRIPE_API_KEY');
    this.stripe = new Stripe(stripeApiKey, {
      apiVersion: '2024-04-10', 
    });
  }

  async createPrice(createPlanDto: CreatePlanDto): Promise<Stripe.Price> {
    const { amount, currency, name, interval} = createPlanDto;

    return this.stripe.prices.create({
      currency,
      unit_amount: amount,
      recurring: {
        interval
      },
      product_data: {
        name
      },
    });
  }

  async createProduct(createPlanDto: CreatePlanDto) {
    const { name} = createPlanDto;
    // const price = this.createPrice(createPlanDto)
    const product = await this.stripe.products.create({
      name
    });

    return product;
  }

  async create(createPlanDto: CreatePlanDto): Promise<Stripe.Plan> {
    const { amount, currency, name, interval} = createPlanDto;

    const product = await this.createProduct(createPlanDto);

    const plan = await this.stripe.plans.create({
      amount,
      currency,
      interval,
      product: product?.id
    });

    return plan;
  }

  async findOne(planId: string): Promise<Stripe.Plan> {
    const plan = await this.stripe.plans.retrieve(planId);
    return plan;
  }

  async updateProduct(productId: string, updateData: Stripe.ProductUpdateParams): Promise<Stripe.Product> {
    const product = await this.stripe.products.update(productId, updateData);
    return product;
  }

  async update(planId: string, updateData): Promise<Stripe.Plan> {
    const product = await this.updateProduct(planId, updateData);
    const plan = await this.stripe.plans.update(planId, updateData);
    return plan;
  }
  
  async deleteProduct(productId: string): Promise<Stripe.DeletedProduct> {
    const deletedProduct = await this.stripe.products.del(productId);
    // const product = await this.deleteProduct(planId);
    return deletedProduct;
  }

  async delete(planId: string): Promise<Stripe.DeletedPlan> {
    const deletedPlan = await this.stripe.plans.del(planId);
    return deletedPlan;
  }

  async findAll(): Promise<Stripe.ApiList<Stripe.Plan>> {
    const plans = await this.stripe.plans.list();
    return plans;
  }
}
