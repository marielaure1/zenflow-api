import { Module } from '@nestjs/common';
import { TaskCommentsService } from '@modules/task-comments/task-comments.service';
import { TaskCommentsController } from '@modules/task-comments/task-comments.controller';
import { UsersModule } from '@modules/users/users.module';
import { TasksModule } from '@modules/tasks/tasks.module';

@Module({
  controllers: [TaskCommentsController],
  providers: [TaskCommentsService],
  imports: [TaskCommentsModule, UsersModule, TasksModule],
  exports: [TaskCommentsModule]
})
export class TaskCommentsModule {}
