import { Module } from '@nestjs/common';
import { TaskCategoriesService } from '@modules/tasks-categories/tasks-categories.service';
import { TaskCategoriesController } from '@modules/tasks-categories/tasks-categories.controller';
import { TasksService } from '@modules/tasks/tasks.service';
import { TasksModule } from '@modules/tasks/tasks.module';

@Module({
  controllers: [TaskCategoriesController],
  providers: [TaskCategoriesService, TasksService],
  imports: [TasksModule],
  exports: [TasksCategoriesModule]
})
export class TasksCategoriesModule {}
