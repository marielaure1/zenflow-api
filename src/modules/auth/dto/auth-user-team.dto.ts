import { Document } from 'mongoose';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { CreateTeamDto } from '@/team/dto/create-team.dto';

export class AuthUserTeamDto extends IntersectionType(
  Document,
  CreateUserDto,
  CreateTeamDto,
) {}