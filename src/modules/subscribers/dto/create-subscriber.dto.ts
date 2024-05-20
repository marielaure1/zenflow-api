import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubscriberDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  readonly customerId: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  readonly planId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  readonly startDate?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  readonly endDate?: Date;
}
