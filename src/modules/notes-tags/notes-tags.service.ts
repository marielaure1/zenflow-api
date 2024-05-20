import { Injectable } from '@nestjs/common';
import { CreateNotesTagDto } from './dto/create-notes-tag.dto';
import { UpdateNotesTagDto } from './dto/update-notes-tag.dto';

@Injectable()
export class NotesTagsService {
  create(createNotesTagDto: CreateNotesTagDto) {
    return 'This action adds a new notesTag';
  }

  findAll() {
    return `This action returns all notesTags`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notesTag`;
  }

  update(id: number, updateNotesTagDto: UpdateNotesTagDto) {
    return `This action updates a #${id} notesTag`;
  }

  remove(id: number) {
    return `This action removes a #${id} notesTag`;
  }
}
