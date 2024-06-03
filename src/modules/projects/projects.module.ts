import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TasksModule } from '@modules/tasks/tasks.module';
import { TasksService } from '@modules/tasks/tasks.service';
@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, TasksService],
  imports: [TasksModule],
  exports: [ProjectsModule],
})
export class ProjectsModule {}
