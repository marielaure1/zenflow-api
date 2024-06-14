import ResponsesHelper from "@helpers/responses.helpers";
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { NoteFoldersService } from './note-folders.service';
import { CreateNoteFolderDto } from './dto/create-note-folder.dto';
import { UpdateNoteFolderDto } from './dto/update-note-folder.dto';
import { AppController } from '@modules/app.controller';
import { NoteFolder, NoteFolderDocument } from './entities/note-folder.entity';
import { Response } from "express";
import { log } from "console";

@Controller('note-folders')
export class NoteFoldersController extends AppController<NoteFolderDocument, CreateNoteFolderDto, UpdateNoteFolderDto>{

  constructor(
      private readonly noteFoldersService: NoteFoldersService
  ) {
      super(noteFoldersService, "noteFolders");
  }

}
