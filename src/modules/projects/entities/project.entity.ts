import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '@modules/users/entities/user.entity';
import { Task } from '@modules/tasks/entities/task.entity';
import { TaskCategory } from '@modules/tasks-categories/entities/tasks-category.entity';
import { CustomField } from '@entities/custom-fields.entity';
import { Milestone, MilestoneSchema } from '@entities/milestones.entity';

export type ProjectDocument = Project & Document;

const CustomFieldSchema = SchemaFactory.createForClass(CustomField);

@Schema({
  timestamps: true,
  collection: 'prj_project'
})
export class Project {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  picture?: string;

  @Prop()
  priority?: string;

  @Prop({ type: Types.ObjectId, ref: "UsrUser", required: true })
  ownerId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "Team" })
  teamId?: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: "ProjectMilestone" }] })
  milestoneIds?: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: "Note" }] })
  noteIds?: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: "CrmClient" })
  clientId?: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: "ProjectTaskCategory" }] })
  taskCategoryId?: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: "ProjectCategory" }] })
  categoryIds?: Types.ObjectId[];

  @Prop({ type: Map, of: CustomFieldSchema })b
  customFields?: Map<string, CustomField>;

  createdAt?: Date;
  updatedAt?: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
