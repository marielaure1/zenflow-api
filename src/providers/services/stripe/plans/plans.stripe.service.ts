import { Injectable, Inject } from '@nestjs/common';
import Stripe from 'stripe';
import { CreatePlanDto } from '@modules/plans/dto/create-plan.dto';

@Injectable()
export class PlansStripeService {
  private readonly stripe: Stripe;

  constructor(@Inject('STRIPE_API_KEY') private readonly stripeApiKey: string) {
    this.stripe = new Stripe(this.stripeApiKey, {
      apiVersion: '2024-04-10', 
    });
  }

  // Méthode pour créer un plan
  async create(createPlanDto: CreatePlanDto): Promise<Stripe.Plan> {
    const { amount, currency, name, interval} = createPlanDto;
    const plan = await this.stripe.plans.create({
      amount,
      currency,
      interval,
      product: {
        name,
      },
    });

    return plan;
  }

  // Méthode pour récupérer un plan par son ID
  async findOne(planId: string): Promise<Stripe.Plan> {
    const plan = await this.stripe.plans.retrieve(planId);
    return plan;
  }

  // Méthode pour mettre à jour un plan
  async update(planId: string, updateData: Stripe.PlanUpdateParams): Promise<Stripe.Plan> {
    const plan = await this.stripe.plans.update(planId, updateData);
    return plan;
  }

  // Méthode pour supprimer un plan
  async delete(planId: string): Promise<Stripe.DeletedPlan> {
    const deletedPlan = await this.stripe.plans.del(planId);
    return deletedPlan;
  }

  // Méthode pour lister tous les plans
  async findAll(): Promise<Stripe.ApiList<Stripe.Plan>> {
    const plans = await this.stripe.plans.list();
    return plans;
  }
}
