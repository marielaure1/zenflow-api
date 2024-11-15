import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Customer } from '@modules/customers/entities/customer.entity';
import { Project } from '@modules/projects/entities/project.entity';
import { TimeEntry, TimeEntrySchema } from './time-entry.entity';
import { CustomField, CustomFieldSchema } from '@entities/custom-fields.entity';
import { TaskCategorie } from '@modules/task-categories/entities/task-categorie.entity';
import { Priority } from '@enums/priority.enum';

export type TaskDocument = Task & Document;

@Schema({
  timestamps: true
})
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Types.ObjectId, ref: Project.name })
  projectId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Customer.name })
  assigneeId: Types.ObjectId;

  @Prop()
  dueDate?: Date;

  @Prop({enum: Priority})
  priority?: string;

  @Prop({default: false})
  completed: boolean;
  
  @Prop({ type: [{ title: String, color: String }] })
  flags?: { title: string; color: string }[];

  @Prop({ type: Map, of: CustomFieldSchema })
  customFields?: Map<string, CustomField>;

  @Prop({ type: Types.ObjectId, ref: "Task"})
  parentTaskId?: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: Task.name }] })
  subTasks?: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: TaskCategorie.name})
  taskCategoryId?: Types.ObjectId;

  @Prop()
  order: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
