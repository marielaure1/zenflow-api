import { Module } from '@nestjs/common';
import { NotesTagsService } from './notes-tags.service';
import { NotesTagsController } from './notes-tags.controller';

@Module({
  controllers: [NotesTagsController],
  providers: [NotesTagsService],
})
export class NotesTagsModule {}
