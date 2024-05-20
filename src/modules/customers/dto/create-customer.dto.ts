import { IsNotEmpty, IsOptional, Length, IsEmail, Matches, IsDateString, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';
import regex from "@constants/regex";

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsMongoId()
  user_id: Types.ObjectId;

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
  @IsDateString()
  dateOfBirth?: Date;
}