import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User, UserSchema } from '@modules/users/entities/user.entity';

export type CustomerDocument = Customer & Document;

@Schema({
  timestamps: true
})
export class Customer {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) // Référence vers le modèle User
  user: Types.ObjectId;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  address?: string;

  @Prop()
  phone?: string;

  @Prop()
  dateOfBirth?: Date;

  @Prop()
  stripeCustomerId: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
