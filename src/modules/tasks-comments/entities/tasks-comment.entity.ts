import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '@modules/users/entities/user.entity';
import { Task } from '@modules/tasks/entities/task.entity';

export type TaskCommentDocument = TaskComment & Document;

@Schema({
  timestamps: true
})
export class TaskComment {
  @Prop({ required: true })
  content: string;

  @Prop({ type: Types.ObjectId, ref: Task.name, required: true })
  taskId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  authorId: Types.ObjectId;

  @Prop({ default: [] })
  attachments?: string[];

  createdAt?: Date;
  updatedAt?: Date;
}

export const TaskCommentSchema = SchemaFactory.createForClass(TaskComment);
