import { Controller, Get, Post, Body, Param, Delete, Res, HttpStatus, UseGuards, Req, Put } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { AppController } from '@modules/app.controller';
import { Note, NoteDocument } from './entities/note.entity';
import { Response, Request } from "express";
import ResponsesHelper from "@helpers/responses.helpers";
import { AuthGuard } from "@guards/auth.guard";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('notes')
@Controller('notes')
export class NotesController extends AppController<NoteDocument, CreateNoteDto, UpdateNoteDto>{

  constructor(
      private readonly notesService: NotesService
  ) {
      super(notesService, "notes");
      this.responsesHelper = new ResponsesHelper();
  }

  @ApiOperation({ summary: 'Create a new note' })
  @ApiResponse({ status: 201, description: 'The note has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBearerAuth()
  @Post()
  async create(@Body() createNoteDto: CreateNoteDto, @Res() res: Response) {
    return super.create(createNoteDto, res);
  }

  @ApiOperation({ summary: 'Get all notes' })
  @ApiResponse({ status: 200, description: 'Return all notes.' })
  @ApiResponse({ status: 404, description: 'Notes not found.' })
  @Get()
  async findAll(@Res() res: Response) {
    return super.findAll(res);
  }

  @ApiOperation({ summary: 'Get a note by id' })
  @ApiResponse({ status: 200, description: 'Return a note.' })
  @ApiResponse({ status: 404, description: 'Note not found.' })
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    return super.findOne(id, res);
  }

  @ApiOperation({ summary: 'Update a note by id' })
  @ApiResponse({ status: 200, description: 'The note has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Note not found.' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto, @Res() res: Response) {
    return super.update(id, updateNoteDto, res);
  }

  @ApiOperation({ summary: 'Delete a note by id' })
  @ApiResponse({ status: 200, description: 'The note has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Note not found.' })
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    return super.remove(id, res);
  }

  @ApiOperation({ summary: 'Get all notes for the current owner' })
  @ApiResponse({ status: 200, description: 'Return all notes for the current owner.' })
  @ApiResponse({ status: 404, description: 'Notes not found.' })
  @UseGuards(AuthGuard)
  @Get("me")
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
        subject: "notes",
        data,
      });
    } catch (error) {
      if (error.message === "Not Found") {
        return this.responsesHelper.getResponse({
          res,
          path: "findAllOwner",
          method: "Get",
          code: HttpStatus.NOT_FOUND,
          subject: "notes",
          data: error.message,
        });
      } else {
        console.error("NotesController > findAllOwner : ", error);
        return this.responsesHelper.getResponse({
          res,
          path: "findAllOwner",
          method: "Get",
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          subject: "notes",
          data: error.message,
        });
      }
    }
  }
}
