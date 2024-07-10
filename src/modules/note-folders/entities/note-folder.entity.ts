import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type NoteFolderDocument = NoteFolder & Document;

@Schema({
  timestamps: true
})
export class NoteFolder {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ type: Types.ObjectId, ref: "NoteFolder"})
  parentId?: Types.ObjectId;

  @Prop({ required: true })
  ownerId: string;

  @Prop()
  order?: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export const NoteFolderSchema = SchemaFactory.createForClass(NoteFolder);
