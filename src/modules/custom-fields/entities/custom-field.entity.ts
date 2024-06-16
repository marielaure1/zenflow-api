import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CustomFieldDocument = CustomField & Document;

@Schema({
  timestamps: true
})
export class CustomField {
  @Prop({ required: true })
  name: string;
  
  @Prop({ required: true })
  type: string;

  @Prop({ default: [] })
  options?: Array<Object>;

  @Prop()
  position?: number;

  @Prop({ required: true })
  schema: string;

  @Prop()
  schemaIds?: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: "Customer", required: true })
  ownerId: Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}

export const CustomFieldSchema = SchemaFactory.createForClass(CustomField);