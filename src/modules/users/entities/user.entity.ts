import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import UserStatut from "@modules/users/enum/user-statut.enum";
import RoleEnum from "@enums/role.enum";
import { PermissionUser } from "@modules/permissions-users/entities/permissions-user.entity";

export type UserDocument = User & Document;

@Schema({
  timestamps: true
})
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: UserStatut.NOTVERIFIED, enum: UserStatut })
  status: UserStatut;

  @Prop()
  token?: string;

  @Prop({ default: RoleEnum.USER, enum: RoleEnum })
  role: RoleEnum;

  @Prop({ type: [{ type: Types.ObjectId, ref: PermissionUser.name }] })
  permissions?: PermissionUser[];

  @Prop({ required: true, unique: true })
  uid: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('find', function () {
  this.select('-password'); // Exclure le champ password de toutes les requêtes find
});