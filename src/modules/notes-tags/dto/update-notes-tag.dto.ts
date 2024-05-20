import { PartialType } from '@nestjs/swagger';
import { CreateNotesTagDto } from './create-notes-tag.dto';

export class UpdateNotesTagDto extends PartialType(CreateNotesTagDto) {}
