import { IsNotEmpty, IsOptional, ValidateNested ,IsEmpty, Length, IsEmail, Matches, IsDateString, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';
import { User } from '@modules/users/entities/user.entity';
import regex from "@constants/regex";

export class CreateCustomerDto {
  @IsEmpty()
  @ValidateNested() 
  @Type(() => User)
  user: User;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsOptional()
  address?: string;

  @IsOptional()
  @Matches(regex.phone)
  phone?: string;

  @IsOptional()
  stripeCustomerId?: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: Date;
}