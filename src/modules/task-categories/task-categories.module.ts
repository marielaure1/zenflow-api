import { Module } from '@nestjs/common';
import { TaskCategoriesService } from '@modules/task-categories/task-categories.service';
import { TaskCategoriesController } from '@modules/task-categories/task-categories.controller';
import { TasksService } from '@modules/tasks/tasks.service';
import { TasksModule } from '@modules/tasks/tasks.module';

@Module({
  controllers: [TaskCategoriesController],
  providers: [TaskCategoriesService, TasksService],
  imports: [TasksModule],
  exports: [TaskCategoriesModule]
})
export class TaskCategoriesModule {}
