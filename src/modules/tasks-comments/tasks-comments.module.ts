import { Module } from '@nestjs/common';
import { TaskCommentsService } from '@modules/tasks-comments/tasks-comments.service';
import { TaskCommentsController } from '@modules/tasks-comments/tasks-comments.controller';
import { UsersModule } from '@modules/users/users.module';
import { TasksModule } from '@modules/tasks/tasks.module';

@Module({
  controllers: [TaskCommentsController],
  providers: [TaskCommentsService],
  imports: [TasksCommentsModule, UsersModule, TasksModule],
  exports: [TasksCommentsModule]
})
export class TasksCommentsModule {}
