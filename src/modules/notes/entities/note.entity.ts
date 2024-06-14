import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NoteDocument = Note & Document;

@Schema({
  timestamps: true
})
export class Note {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
