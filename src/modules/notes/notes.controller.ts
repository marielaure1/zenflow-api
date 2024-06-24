import ResponsesHelper from "@helpers/responses.helpers";
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { AppController } from '@modules/app.controller';
import { Note, NoteDocument } from './entities/note.entity';
import { Response } from "express";
import { log } from "console";
import { AuthGuard } from "@guards/auth.guard";

@Controller('notes')
export class NotesController extends AppController<NoteDocument, CreateNoteDto, UpdateNoteDto>{

  constructor(
      private readonly notesService: NotesService
  ) {
      super(notesService, "notes");
  }

  @Get("me")
  @UseGuards(AuthGuard)
  async findAllOwner(@Res() res: Response, @Req() req: Request) {
    const customer = req['customer'];
 
    try {
      const data = await this.notesService.findWhere({where: {ownerId: customer._id.toString() }});
      if (!data || data.length === 0) {
        throw new Error("Not Found");
      }
      return this.responsesHelper.getResponse({
        res,
        path: "findAllOwner",
        method: "Get",
        code: HttpStatus.OK,
        subject: "prospects",
        data,
      });
    } catch (error) {
      if (error.message === "Not Found") {
        return this.responsesHelper.getResponse({
          res,
          path: "findAllOwner",
          method: "Get",
          code: HttpStatus.NOT_FOUND,
          subject: "prospects",
          data: error.message,
        });
      } else {
        console.error("AppController > findAllOwner : ", error);
        return this.responsesHelper.getResponse({
          res,
          path: "findAllOwner",
          method: "Get",
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          subject: "prospects",
          data: error.message,
        });
      }
    }
  }

}
