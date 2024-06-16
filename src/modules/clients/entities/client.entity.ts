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

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  status: string;

  @Prop({ type: Types.ObjectId, ref: "Customer", required: true })
  ownerId: Types.ObjectId;

  @Prop({ type: Map, of: CustomFieldValueSchema })
  customFieldValue?: Map<string, CustomFieldValue>;

  createdAt?: Date;
  updatedAt?: Date;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
