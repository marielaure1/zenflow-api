import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res } from '@nestjs/common';
import { TaskCategoriesService } from '@modules/task-categories/task-categories.service';
import { TasksService } from '@modules/tasks/tasks.service';
import { CreateTaskCategorieDto } from '@modules/task-categories/dto/create-task-categorie.dto';
import { UpdateTaskCategorieDto } from '@modules/task-categories/dto/update-task-categorie.dto';
import ResponsesHelper from "@helpers/responses.helpers";
import { AppController } from '@modules/app.controller';
import { TaskCategorie, TaskCategorieDocument } from '@modules/task-categories/entities/task-categorie.entity';
import { Response } from "express";
@Controller('tasks-categories')
export class TaskCategoriesController extends AppController<TaskCategorieDocument, CreateTaskCategorieDto, UpdateTaskCategorieDto>{

  constructor(
      private readonly taskCategoriesService: TaskCategoriesService,
      private readonly tasksService: TasksService,
  ) {
      super(taskCategoriesService, "tasksCategories");
      this.responsesHelper = new ResponsesHelper();
  }

  @Get(":id/tasks")
  async findTasks(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.taskCategoriesService.findOne(id);
      if (!data) {
        throw new Error("Not Found");
      }

      const dataTasks = await this.tasksService.findWhere({where: {taskCategoryId: id}});
      if (!dataTasks) {
        throw new Error("Not Found");
      }

      return this.responsesHelper.getResponse({
        res,
        path: "findTasksCategories",
        method: "Get",
        code: HttpStatus.OK,
        subject: "tasks",
        data: {
          data: data,
          tasks: dataTasks
        },
      });
    } catch (error) {
      if (error.message === "Not Found") {
        return this.responsesHelper.getResponse({
          res,
          path: "findTasksCategories",
          method: "Get",
          code: HttpStatus.NOT_FOUND,
          subject: "tasks",
          data: error.message,
        });
      } else {
        console.error("ProjectController > findTasksCategories : ", error);
        return this.responsesHelper.getResponse({
          res,
          path: "findOne",
          method: "Get",
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          subject: "tasks",
          data: error.message,
        });
      }
    }
  }
}
