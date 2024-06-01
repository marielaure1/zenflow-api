import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Customer } from '@modules/customers/entities/customer.entity';
import { Plan } from '@modules/plans/entities/plan.entity';

export type SubscriptionDocument = Subscription & Document;

@Schema({ timestamps: true })
export class Subscription {
  @Prop({ type: Types.ObjectId, ref: 'Customer', required: true })
  customer: Customer;

  @Prop({ type: Types.ObjectId, ref: 'Plan', required: true })
  plan: Plan;

  @Prop({ type: String, required: true })
  stripeCustomerId: string;

  @Prop({ type: String, required: true })
  stripeSubscriptionId: string;
  
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @Prop({ type: Date })
  startDate: Date;

  @Prop({ type: Date })
  endDate: Date;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
