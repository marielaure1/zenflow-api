import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type NoteDocument = Note & Document;

@Schema({
  timestamps: true
})
export class Note {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  // @Prop({ required: true })
  // background: string;

  // @Prop({ required: true })
  // foreground: string;

  
  @Prop({ required: true })
  ownerId: string;

  @Prop({ type: Types.ObjectId, ref: "NoteFolder"})
  folderId?: Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
