import { User } from '@modules/users/entities/user.entity';
import { IsEmail, IsNotEmpty, IsOptional, Length, IsEmpty, Matches } from 'class-validator';
import regex from "@constants/regex";
import UserStatut from "@modules/users/enum/user-statut.enum";
import RoleEnum from "@enums/role.enum";

export class CreateUserDto {

  @IsEmpty()
  status: UserStatut;

  @IsEmpty()
  role: RoleEnum;

  @IsOptional()
  token?: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  uid?: string;

  @IsNotEmpty()
  password: string;
}