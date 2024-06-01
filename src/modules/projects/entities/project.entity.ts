import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '@modules/users/entities/user.entity';
import { Task } from '@modules/tasks/entities/task.entity';

export type ProjectDocument = Project & Document;

@Schema({
  timestamps: true
})
export class Project {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  ownerId: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: Task.name }] })
  tasks?: Task[];

  createdAt?: Date;
  updatedAt?: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
