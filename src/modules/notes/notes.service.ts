import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note, NoteDocument } from '@modules/notes/entities/note.entity';
import { CreateNoteDto } from '@modules/notes/dto/create-note.dto';
import { UpdateNoteDto } from '@modules/notes/dto/update-note.dto';
import { AppService } from '@modules/app.service';

@Injectable()
export class NotesService extends AppService<NoteDocument, CreateNoteDto, UpdateNoteDto>{

  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {
    super(noteModel);
  }
}
