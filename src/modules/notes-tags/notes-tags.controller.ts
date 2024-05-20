import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotesTagsService } from './notes-tags.service';
import { CreateNotesTagDto } from './dto/create-notes-tag.dto';
import { UpdateNotesTagDto } from './dto/update-notes-tag.dto';

@Controller('notes-tags')
export class NotesTagsController {
  constructor(private readonly notesTagsService: NotesTagsService) {}

  @Post()
  create(@Body() createNotesTagDto: CreateNotesTagDto) {
    return this.notesTagsService.create(createNotesTagDto);
  }

  @Get()
  findAll() {
    return this.notesTagsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notesTagsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotesTagDto: UpdateNotesTagDto) {
    return this.notesTagsService.update(+id, updateNotesTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesTagsService.remove(+id);
  }
}
