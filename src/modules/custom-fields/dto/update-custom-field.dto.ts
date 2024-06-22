import { PartialType } from '@nestjs/swagger';
import { CreateCustomFieldDto } from './create-custom-field.dto';
import { Types } from 'mongoose';
import { IsOptional } from 'class-validator';

export class UpdateCustomFieldDto extends PartialType(CreateCustomFieldDto) {
    @IsOptional()
    _id?: string;
}
