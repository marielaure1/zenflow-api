import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MemberDocument = Member & Document;

@Schema({
  timestamps: true
})
export class Member {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Customer' })
  customerID: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Member' })
  memberId: Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
