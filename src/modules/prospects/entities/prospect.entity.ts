import { CustomField } from '@entities/custom-fields.entity';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProspectDocument = Prospect & Document;

const CustomFieldSchema = SchemaFactory.createForClass(CustomField);


@Schema({
  timestamps: true
})
export class Prospect {
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

  @Prop({ type: Map, of: CustomFieldSchema })
  customFields?: Map<string, CustomField>;

  createdAt?: Date;
  updatedAt?: Date;
}

export const ProspectSchema = SchemaFactory.createForClass(Prospect);
