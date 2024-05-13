import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: "Desactived" })
  statut: string;

  @Prop()
  token?: string;

  @Prop()
  createdAt?: Number;

  @Prop({ default: Date.now()})
  updatedAt?: Number;
}

export const UserSchema = SchemaFactory.createForClass(User);