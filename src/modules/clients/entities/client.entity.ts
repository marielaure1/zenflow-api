import { CustomFieldValue } from '@entities/custom-field-value.entity';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ClientDocument = Client & Document;

const CustomFieldValueSchema = SchemaFactory.createForClass(CustomFieldValue);

@Schema({
  timestamps: true
})
export class Client {
  @Prop()
  society?: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  status: string;

  @Prop()
  lastContactDate?: Date;

  @Prop()
  marketSegment?: string;

  @Prop()
  needs?: string;

  @Prop()
  leadSource?: string;

  @Prop()
  companySize?: string;

  @Prop()
  estimatedBudget?: number;

  @Prop({ required: true })
  ownerId: string;

  @Prop({ type: Map, of: CustomFieldValueSchema })
  customFieldValues?: Map<string, CustomFieldValue>;

  createdAt?: Date;
  updatedAt?: Date;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
