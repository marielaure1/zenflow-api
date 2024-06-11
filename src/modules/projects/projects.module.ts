import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TasksModule } from '@modules/tasks/tasks.module';
import { TasksService } from '@modules/tasks/tasks.service';
import { TasksCategoriesModule } from '@modules/tasks-categories/tasks-categories.module';
import { TaskCategoriesService } from '@modules/tasks-categories/tasks-categories.service';
@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, TasksService, TaskCategoriesService],
  imports: [TasksModule, TasksCategoriesModule],
  exports: [ProjectsModule],
})
export class ProjectsModule {}
