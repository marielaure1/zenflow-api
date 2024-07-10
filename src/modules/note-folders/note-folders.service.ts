import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NoteFolder, NoteFolderDocument } from '@modules/note-folders/entities/note-folder.entity';
import { CreateNoteFolderDto } from '@modules/note-folders/dto/create-note-folder.dto';
import { UpdateNoteFolderDto } from '@modules/note-folders/dto/update-note-folder.dto';
import { AppService } from '@modules/app.service';

@Injectable()
export class NoteFoldersService extends AppService<NoteFolderDocument, CreateNoteFolderDto, UpdateNoteFolderDto>{

  constructor(@InjectModel(NoteFolder.name) private noteFolderModel: Model<NoteFolderDocument>) {
    super(noteFolderModel);
  }
}
