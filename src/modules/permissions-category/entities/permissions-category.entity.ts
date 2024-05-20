import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PermissionCategoryDocument = PermissionCategory & Document;

@Schema({
  timestamps: true
})
export class PermissionCategory {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export const PermissionCategorySchema = SchemaFactory.createForClass(PermissionCategory);
