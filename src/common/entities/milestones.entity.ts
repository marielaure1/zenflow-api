import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MilestoneDocument = Milestone & Document;

@Schema()
export class Milestone {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  dueDate: Date;

  @Prop()
  completed?: boolean;
}

export const MilestoneSchema = SchemaFactory.createForClass(Milestone);
