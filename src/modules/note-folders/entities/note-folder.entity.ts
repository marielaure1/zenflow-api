import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NoteFolderDocument = NoteFolder & Document;

@Schema({
  timestamps: true
})
export class NoteFolder {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export const NoteFolderSchema = SchemaFactory.createForClass(NoteFolder);
