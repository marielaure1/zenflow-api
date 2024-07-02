import { IsEmail, IsNotEmpty, IsOptional, Length, IsEmpty, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import regex from "@constants/regex";
import UserStatut from "@modules/users/enum/user-statut.enum";
import RoleEnum from "@enums/role.enum";

export class CreateUserDto {
  @ApiPropertyOptional({ description: 'The status of the user', enum: UserStatut })
  @IsEmpty()
  status: UserStatut;

  @ApiPropertyOptional({ description: 'The role of the user', enum: RoleEnum })
  @IsEmpty()
  role: RoleEnum;

  @ApiPropertyOptional({ description: 'The token of the user' })
  @IsOptional()
  token?: string;
  
  @ApiPropertyOptional({ description: 'The UID of the user' })
  @IsNotEmpty()
  uid?: string;
}
