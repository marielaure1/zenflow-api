import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PermissionType } from '@modules/permissions/enum/permissions-type.enum';

export type PermissionDocument = Permission & Document;

@Schema({
  timestamps: true
})
export class Permission {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true, enum: PermissionType })
  type: PermissionType;

  @Prop({ type: Types.ObjectId, ref: 'PermissionCategory', required: true })
  permission_category_id: Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
