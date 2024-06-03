import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskCategoriesService } from '@modules/tasks-categories/tasks-categories.service';
import { CreateTaskCategoryDto } from '@modules/tasks-categories/dto/create-tasks-category.dto';
import { UpdateTaskCategoryDto } from '@modules/tasks-categories/dto/update-tasks-category.dto';
import ResponsesHelper from "@helpers/responses.helpers";
import { AppController } from '@modules/app.controller';
import { TaskCategory } from '@modules/tasks-categories/entities/tasks-category.entity';

@Controller('tasks-categories')
export class TaskCategoriesController extends AppController<TaskCategoriesService, TaskCategory, CreateTaskCategoryDto, UpdateTaskCategoryDto>{

  constructor(
      private readonly taskCategoriesService: TaskCategoriesService,
  ) {
      super(taskCategoriesService, "tasksCategories");
      this.responsesHelper = new ResponsesHelper();
  }
}
