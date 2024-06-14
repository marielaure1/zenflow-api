import { PartialType } from '@nestjs/swagger';
import { CreateNoteFolderDto } from './create-note-folder.dto';

export class UpdateNoteFolderDto extends PartialType(CreateNoteFolderDto) {}
