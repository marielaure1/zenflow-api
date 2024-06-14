import ResponsesHelper from "@helpers/responses.helpers";
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { AppController } from '@modules/app.controller';
import { Note, NoteDocument } from './entities/note.entity';
import { Response } from "express";
import { log } from "console";

@Controller('notes')
export class NotesController extends AppController<NoteDocument, CreateNoteDto, UpdateNoteDto>{

  constructor(
      private readonly notesService: NotesService
  ) {
      super(notesService, "notes");
  }

}
