import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '@modules/users/entities/user.entity';
import { Task } from '@modules/tasks/entities/task.entity';
import { TaskCategory } from '@modules/tasks-categories/entities/tasks-category.entity';
import { CustomField } from '@entities/custom-fields.entity';

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

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  ownerId: Types.ObjectId;

  // @Prop({ type: Types.ObjectId, ref: Client.name })
  // clientId?: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: "Task" }] })
  tasks?: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: TaskCategory.name }] })
  categoryIds?: Types.ObjectId[];


  @Prop({ type: Map, of: CustomFieldSchema })
  customFields?: Map<string, CustomField>;

  createdAt?: Date;
  updatedAt?: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
