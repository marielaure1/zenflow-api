import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '@modules/users/entities/user.entity';
import { Project } from '@modules/projects/entities/project.entity';
import { TaskComment } from '@modules/tasks-comments/entities/tasks-comment.entity';
import { TimeEntry, TimeEntrySchema } from './time-entry.entity';
import { CustomField, CustomFieldSchema } from '@entities/custom-fields.entity';
import { TaskCategory } from '@modules/tasks-categories/entities/tasks-category.entity';

export type TaskDocument = Task & Document;

@Schema({
  timestamps: true
})
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Types.ObjectId, ref: Project.name, required: true })
  projectId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: User.name })
  assigneeId: Types.ObjectId;

  @Prop({ required: true })
  status: string;

  @Prop()
  dueDate: Date;

  @Prop()
  priority: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: TaskComment.name }] })
  comments?: Types.ObjectId[];

  @Prop({ type: [{ title: String, color: String }] })
  flags?: { title: string; color: string }[];

  @Prop({ type: [TimeEntrySchema] })
  timeEntries?: TimeEntry[];

  @Prop({ type: Map, of: CustomFieldSchema })
  customFields?: Map<string, CustomField>;

  @Prop({ type: Types.ObjectId, ref: Task.name })
  parentTaskId?: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: Task.name }] })
  subTasks?: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: TaskCategory.name }] })
  categoryIds?: Types.ObjectId[];

  @Prop()
  section: string;

  @Prop()
  order: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
