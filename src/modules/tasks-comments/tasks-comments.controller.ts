import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskCommentsService } from '@modules/tasks-comments/tasks-comments.service';
import { CreateTaskCommentDto } from '@modules/tasks-comments/dto/create-tasks-comment.dto';
import { UpdateTaskCommentDto } from '@modules/tasks-comments/dto/update-tasks-comment.dto';
import { AppController } from '@modules/app.controller';
import ResponsesHelper from "@helpers/responses.helpers";
import { TaskCategory } from '@modules/tasks-categories/entities/tasks-category.entity';
import { CreateTaskCategoryDto } from '@modules/tasks-categories/dto/create-tasks-category.dto';
import { UpdateTaskCategoryDto } from '@modules/tasks-categories/dto/update-tasks-category.dto';
@Controller('tasks-comments')
export class TaskCommentsController extends AppController<TaskCommentsService, TaskCategory, CreateTaskCategoryDto, UpdateTaskCategoryDto>{

  constructor(
      private readonly taskCommentsService: TaskCommentsService,
  ) {
      super(taskCommentsService, "tasksCategories");
      this.responsesHelper = new ResponsesHelper();
  }
}
