import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Project } from '@modules/projects/entities/project.entity';

export type TaskDocument = Task & Document;

@Schema({
  timestamps: true
})
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: ['pending', 'in-progress', 'completed'], default: 'pending' })
  status: string;

  @Prop({ type: Types.ObjectId, ref: Project.name, required: true })
  projectId: Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
