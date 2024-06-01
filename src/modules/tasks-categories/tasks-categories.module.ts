import { Module } from '@nestjs/common';
import { TasksCategoriesService } from './tasks-categories.service';
import { TasksCategoriesController } from './tasks-categories.controller';

@Module({
  controllers: [TasksCategoriesController],
  providers: [TasksCategoriesService],
})
export class TasksCategoriesModule {}
