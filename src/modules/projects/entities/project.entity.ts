import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Customer } from '@modules/customers/entities/customer.entity';
import { Task } from '@modules/tasks/entities/task.entity';
import { TaskCategorie } from '@modules/task-categories/entities/task-categorie.entity';
import { CustomField } from '@entities/custom-fields.entity';
import { Milestone, MilestoneSchema } from '@entities/milestones.entity';
import { Priority } from '@enums/priority.enum';

export type ProjectDocument = Project & Document;

const CustomFieldSchema = SchemaFactory.createForClass(CustomField);

@Schema({
  timestamps: true
})
export class Project {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  picture?: string;

  @Prop({ enum: Priority })
  priority?: string;

  @Prop({ type: Types.ObjectId, ref: "Customer", required: true })
  ownerId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "Team" })
  teamId?: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: "Milestone" }] })
  milestoneIds?: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: "Note" }] })
  noteIds?: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: "Client" })
  clientId?: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: "TaskCategory" }] })
  taskCategoryId?: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: "Category" }] })
  categoryIds?: Types.ObjectId[];

  @Prop({ type: Map, of: CustomFieldSchema })b
  customFields?: Map<string, CustomField>;

  createdAt?: Date;
  updatedAt?: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
