import { CustomField } from '@entities/custom-fields.entity';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClientDocument = Client & Document;

const CustomFieldSchema = SchemaFactory.createForClass(CustomField);

@Schema({
  timestamps: true
})
export class Client {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  status: string;

  @Prop({ type: Map, of: CustomFieldSchema })
  customFields?: Map<string, CustomField>;

  createdAt?: Date;
  updatedAt?: Date;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
