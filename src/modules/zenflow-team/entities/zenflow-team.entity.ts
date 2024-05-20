export class ZenflowTeam {}
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ZenFlowTeamDocument = ZenFlowTeam & Document;

@Schema({
  timestamps: true
})
export class ZenFlowTeam {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ type: [String], default: [] })
  permissions: string[];

  createdAt?: Date;
  updatedAt?: Date;
}

export const ZenFlowTeamSchema = SchemaFactory.createForClass(ZenFlowTeam);
