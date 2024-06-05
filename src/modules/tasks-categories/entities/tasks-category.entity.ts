import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Project } from '@modules/projects/entities/project.entity';
import { Document, Types } from 'mongoose';

export type TaskCategoryDocument = TaskCategory & Document;

@Schema({
  timestamps: true
})
export class TaskCategory {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Types.ObjectId, ref: "Project", required: true })
  projectId: Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}

export const TaskCategorySchema = SchemaFactory.createForClass(TaskCategory);
