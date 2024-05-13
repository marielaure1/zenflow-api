import { User } from '@modules/users/entities/user.entity';
import { IsEmail, IsNotEmpty, IsOptional, Length, Matches } from 'class-validator';
import regex from "@constants/regex";

export class CreateUserDto extends User {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8, 20)
  @Matches(regex.password)
  password: string;

  @IsNotEmpty()
  statut: string;

  @IsOptional()
  token?: string;

  @IsOptional()
  createdAt?: Number;

  @IsOptional()
  updatedAt?: Number;
}