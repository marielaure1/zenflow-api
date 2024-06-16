import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TasksModule } from '@modules/tasks/tasks.module';
import { TasksService } from '@modules/tasks/tasks.service';
import { TaskCategoriesModule } from '@modules/task-categories/task-categories.module';
import { TaskCategoriesService } from '@modules/task-categories/task-categories.service';
@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, TasksService, TaskCategoriesService],
  imports: [TasksModule, TaskCategoriesModule],
  exports: [ProjectsModule],
})
export class ProjectsModule {}
