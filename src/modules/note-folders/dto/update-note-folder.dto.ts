import { PartialType } from '@nestjs/swagger';
import { CreateNoteFolderDto } from '@modules/note-folders/dto/create-note-folder.dto';

export class UpdateNoteFolderDto extends PartialType(CreateNoteFolderDto) {}
