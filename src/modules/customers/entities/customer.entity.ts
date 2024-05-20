import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '@modules/users/entities/user.entity';

export type CustomerDocument = Customer & Document;

@Schema({
  timestamps: true
})
export class Customer {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user_id: Types.ObjectId;

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
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
