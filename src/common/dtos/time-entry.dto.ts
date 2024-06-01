import { IsString, IsNotEmpty, IsOptional, IsObject, IsArray, ValidateNested, IsDate, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class TimeEntryDto {
  @IsDate()
  @IsNotEmpty()
  startTime: Date;

  @IsDate()
  @IsNotEmpty()
  endTime: Date;
}
