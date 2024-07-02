import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, Put } from '@nestjs/common';
import { TaskCategoriesService } from '@modules/task-categories/task-categories.service';
import { TasksService } from '@modules/tasks/tasks.service';
import { CreateTaskCategorieDto } from '@modules/task-categories/dto/create-task-categorie.dto';
import { UpdateTaskCategorieDto } from '@modules/task-categories/dto/update-task-categorie.dto';
import ResponsesHelper from "@helpers/responses.helpers";
import { AppController } from '@modules/app.controller';
import { TaskCategorie, TaskCategorieDocument } from '@modules/task-categories/entities/task-categorie.entity';
import { Response } from "express";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('tasks-categories')
@Controller('tasks-categories')
export class TaskCategoriesController extends AppController<TaskCategorieDocument, CreateTaskCategorieDto, UpdateTaskCategorieDto>{

  constructor(
      private readonly taskCategoriesService: TaskCategoriesService,
      private readonly tasksService: TasksService,
  ) {
      super(taskCategoriesService, "tasksCategories");
      this.responsesHelper = new ResponsesHelper();
  }

  @ApiOperation({ summary: 'Create a new task category' })
  @ApiResponse({ status: 201, description: 'The task category has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBearerAuth()
  @Post()
  async create(@Body() createTaskCategorieDto: CreateTaskCategorieDto, @Res() res: Response) {
    return super.create(createTaskCategorieDto, res);
  }

  @ApiOperation({ summary: 'Get all task categories' })
  @ApiResponse({ status: 200, description: 'Return all task categories.' })
  @ApiResponse({ status: 404, description: 'Task categories not found.' })
  @Get()
  async findAll(@Res() res: Response) {
    return super.findAll(res);
  }

  @ApiOperation({ summary: 'Get a task category by id' })
  @ApiResponse({ status: 200, description: 'Return a task category.' })
  @ApiResponse({ status: 404, description: 'Task category not found.' })
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    return super.findOne(id, res);
  }

  @ApiOperation({ summary: 'Update a task category by id' })
  @ApiResponse({ status: 200, description: 'The task category has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Task category not found.' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTaskCategorieDto: UpdateTaskCategorieDto, @Res() res: Response) {
    return super.update(id, updateTaskCategorieDto, res);
  }

  @ApiOperation({ summary: 'Delete a task category by id' })
  @ApiResponse({ status: 200, description: 'The task category has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Task category not found.' })
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    return super.remove(id, res);
  }

  @ApiOperation({ summary: 'Get all tasks for a specific task category' })
  @ApiResponse({ status: 200, description: 'Return all tasks for the specified task category.' })
  @ApiResponse({ status: 404, description: 'Tasks not found.' })
  @Get(":id/tasks")
  async findTasks(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.taskCategoriesService.findOne(id);
      if (!data) {
        throw new Error("Not Found");
      }

      const dataTasks = await this.tasksService.findWhere({ where: { taskCategoryId: id } });
      if (!dataTasks || dataTasks.length === 0) {
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
