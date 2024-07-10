import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Customer } from '@modules/customers/entities/customer.entity';
import { Task } from '@modules/tasks/entities/task.entity';
import { TaskCategorie } from '@modules/task-categories/entities/task-categorie.entity';
import { Milestone, MilestoneSchema } from '@entities/milestones.entity';
import { Priority } from '@enums/priority.enum';
import { StatusEnum } from '@enums/status.enum';
import { CustomFieldValue, CustomFieldValueSchema } from '@entities/custom-field-value.entity';

export type ProjectDocument = Project & Document;

@Schema({
  timestamps: true
})
export class Project {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ enum: StatusEnum })
  status?: string;

  @Prop({ enum: Priority })
  priority?: string;

  @Prop({ required: true })
  ownerId: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: "Note" }] })
  noteIds?: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: "Client" })
  clientId?: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: "TaskCategory" }] })
  taskCategoryId?: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: "Category" }] })
  categoryIds?: Types.ObjectId[];

  @Prop({ type: Map, of: CustomFieldValueSchema })
  customFieldValue?: Map<string, CustomFieldValue>;

  createdAt?: Date;
  updatedAt?: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
