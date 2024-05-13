import { Document } from 'mongoose';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserEmailDto extends Document {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}