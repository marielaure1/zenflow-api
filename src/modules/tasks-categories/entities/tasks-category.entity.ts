import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskCategoryDocument = TaskCategory & Document;

@Schema({
  timestamps: true
})
export class TaskCategory {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export const TaskCategorySchema = SchemaFactory.createForClass(TaskCategory);
