import { User } from '@modules/users/entities/user.entity';
import { IsEmail, IsNotEmpty, IsOptional, Length, IsEmpty, Matches } from 'class-validator';
import regex from "@constants/regex";
import UserStatut from "@modules/users/enum/user-statut.enum";

export class CreateUserDto extends User {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8, 20)
  @Matches(regex.password)
  password: string;

  @IsNotEmpty()
  @Length(8, 20)
  @Matches(regex.password)
  passwordConfirm: string;

  @IsEmpty()
  status: UserStatut;

  @IsEmpty()
  role: string;

  @IsOptional()
  token?: string;
}