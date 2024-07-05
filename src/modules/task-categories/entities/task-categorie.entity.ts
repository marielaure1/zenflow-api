import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Project } from '@modules/projects/entities/project.entity';
import { Document, Types } from 'mongoose';

export type TaskCategorieDocument = TaskCategorie & Document;

@Schema({
  timestamps: true
})
export class TaskCategorie {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Types.ObjectId, ref: "Project", required: true })
  projectId: Types.ObjectId;

  @Prop()
  order?: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export const TaskCategorieSchema = SchemaFactory.createForClass(TaskCategorie);
