import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '@modules/users/entities/user.entity';
import { Permission } from '@modules/permissions/entities/permission.entity';

export type PermissionUserDocument = PermissionUser & Document;

@Schema({
  timestamps: true
})
export class PermissionUser {
  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "Permission", required: true })
  permissionId: Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}

export const PermissionUserSchema = SchemaFactory.createForClass(PermissionUser);
