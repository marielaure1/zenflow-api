import { Document } from 'mongoose';
import { IsNotEmpty, Length, Matches } from 'class-validator';
import Regex from "@constants/regex";

export class UpdateUserPasswordDto extends Document {

  @IsNotEmpty()
  @Length(8, 20)
  @Matches(Regex.password)
  password: string;
}