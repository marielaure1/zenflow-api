import { Module } from '@nestjs/common';
import { TaskCategoriesService } from './tasks-categories.service';
import { TaskCategoriesController } from './tasks-categories.controller';

@Module({
  controllers: [TaskCategoriesController],
  providers: [TaskCategoriesService],
})
export class TasksCategoriesModule {}
