import { Module } from '@nestjs/common';
import { TasksCommentsService } from './tasks-comments.service';
import { TasksCommentsController } from './tasks-comments.controller';

@Module({
  controllers: [TasksCommentsController],
  providers: [TasksCommentsService],
})
export class TasksCommentsModule {}
