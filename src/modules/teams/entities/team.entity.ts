import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TeamDocument = Team & Document;

@Schema({
  timestamps: true
})
export class Team {
  @Prop({ required: true })
  name: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export const TeamSchema = SchemaFactory.createForClass(Team);
