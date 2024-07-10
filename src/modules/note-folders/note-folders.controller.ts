import { Controller, Get, Post, Body, Param, Delete, Res, HttpStatus, UseGuards, Req, Put } from '@nestjs/common';
import { NoteFoldersService } from '@modules/note-folders/note-folders.service';
import { CreateNoteFolderDto } from '@modules/note-folders/dto/create-note-folder.dto';
import { UpdateNoteFolderDto } from '@modules/note-folders/dto/update-note-folder.dto';
import { AppController } from '@modules/app.controller';
import { NoteFolder, NoteFolderDocument } from '@modules/note-folders/entities/note-folder.entity';
import { Response, Request } from "express";
import ResponsesHelper from "@helpers/responses.helpers";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { log } from 'console';

@ApiTags('note-folders')
@Controller('note-folders')
export class NoteFoldersController extends AppController<NoteFolderDocument, CreateNoteFolderDto, UpdateNoteFolderDto>{

  constructor(
      private readonly noteFoldersService: NoteFoldersService
  ) {
      super(noteFoldersService, "note-folders");
      this.responsesHelper = new ResponsesHelper();
  }

  @ApiOperation({ summary: 'Create a new note folder' })
  @ApiResponse({ status: 201, description: 'The note folder has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBearerAuth()
  @Post()
  async create(@Body() createNoteFolderDto: CreateNoteFolderDto, @Res() res: Response) {
    return super.create(createNoteFolderDto, res);
  }

  @ApiOperation({ summary: 'Get all note folders' })
  @ApiResponse({ status: 200, description: 'Return all note folders.' })
  @ApiResponse({ status: 404, description: 'Note Folders not found.' })
  @Get()
  async findAll(@Res() res: Response) {
    return super.findAll(res);
  }

  @ApiOperation({ summary: 'Get a note folder by id' })
  @ApiResponse({ status: 200, description: 'Return a note folder.' })
  @ApiResponse({ status: 404, description: 'Note Folders not found.' })
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    return super.findOne(id, res);
  }

  @ApiOperation({ summary: 'Update a note folder by id' })
  @ApiResponse({ status: 200, description: 'The note folder has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Note Folders not found.' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateNoteFolderDto: UpdateNoteFolderDto, @Res() res: Response) {
    return super.update(id, updateNoteFolderDto, res);
  }

  @ApiOperation({ summary: 'Delete a note folder by id' })
  @ApiResponse({ status: 200, description: 'The note folder has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Note Folders not found.' })
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    return super.remove(id, res);
  }

  @ApiOperation({ summary: 'Get all note folders for the current owner' })
  @ApiResponse({ status: 200, description: 'Return all note folders for the current owner.' })
  @ApiResponse({ status: 404, description: 'Note Folders not found.' })
  @Get("me/all")
  async findAllOwnerWithoutParent(@Res() res: Response, @Req() req: Request) {
    const customer = req['user_supabase'];
 
    try {

      console.log("notefolder");
      
      const data = await this.noteFoldersService.findWhere({
        where: {
          ownerId: customer.id.toString(),
          $or: [
            { parentId: { $exists: false } },
            { parentId: null }
          ] 
        }
      });

      if (!data || data.length === 0) {
        throw new Error("Not Found");
      }
      return this.responsesHelper.getResponse({
        res,
        path: "findAllOwner",
        method: "Get",
        code: HttpStatus.OK,
        subject: "noteFolders",
        data,
      });
    } catch (error) {
      if (error.message === "Not Found") {
        return this.responsesHelper.getResponse({
          res,
          path: "findAllOwner",
          method: "Get",
          code: HttpStatus.NOT_FOUND,
          subject: "noteFolders",
          data: error.message,
        });
      } else {
        console.error("NoteFoldersController > findAllOwner : ", error);
        return this.responsesHelper.getResponse({
          res,
          path: "findAllOwner",
          method: "Get",
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          subject: "noteFolders",
          data: error.message,
        });
      }
    }
  }

  @ApiOperation({ summary: 'Get all child note folders for a specific parent folder for the current owner' })
  @ApiResponse({ status: 200, description: 'Return all child note folders for the specified parent folder.' })
  @ApiResponse({ status: 404, description: 'Child note folders not found.' })
  @Get("me/:id/children")
  async findAllChildrenByParentId(@Res() res: Response, @Req() req: Request, @Param('id') id: string) {
    const customer = req['user_supabase'];

    try {
      const data = await this.noteFoldersService.findWhere({
        where: {
          ownerId: customer.id.toString(),
          parentId: id
        }
      });

      if (!data || data.length === 0) {
        throw new Error("Not Found");
      }
      return this.responsesHelper.getResponse({
        res,
        path: "findAllChildrenByParentId",
        method: "Get",
        code: HttpStatus.OK,
        subject: "noteFolders",
        data,
      });
    } catch (error) {
      if (error.message === "Not Found") {
        return this.responsesHelper.getResponse({
          res,
          path: "findAllChildrenByParentId",
          method: "Get",
          code: HttpStatus.NOT_FOUND,
          subject: "noteFolders",
          data: error.message,
        });
      } else {
        console.error("NoteFoldersController > findAllChildrenByParentId : ", error);
        return this.responsesHelper.getResponse({
          res,
          path: "findAllChildrenByParentId",
          method: "Get",
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          subject: "noteFolders",
          data: error.message,
        });
      }
    }
  }
}
