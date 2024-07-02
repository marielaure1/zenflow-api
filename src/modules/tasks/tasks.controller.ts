import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put } from '@nestjs/common';
import { TasksService } from '@modules/tasks/tasks.service';
import { CreateTaskDto } from '@modules/tasks/dto/create-task.dto';
import { UpdateTaskDto } from '@modules/tasks/dto/update-task.dto';
import { AppController } from '@modules/app.controller';
import ResponsesHelper from "@helpers/responses.helpers";
import { Task, TaskDocument } from '@modules/tasks/entities/task.entity';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController extends AppController<TaskDocument, CreateTaskDto, UpdateTaskDto>{

  constructor(
      private readonly tasksService: TasksService,
  ) {
      super(tasksService, "tasks");
      this.responsesHelper = new ResponsesHelper();
  }

  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'The task has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBearerAuth()
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Res() res: Response) {
    return super.create(createTaskDto, res);
  }

  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, description: 'Return all tasks.' })
  @ApiResponse({ status: 404, description: 'Tasks not found.' })
  @Get()
  async findAll(@Res() res: Response) {
    return super.findAll(res);
  }

  @ApiOperation({ summary: 'Get a task by id' })
  @ApiResponse({ status: 200, description: 'Return a task.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    return super.findOne(id, res);
  }

  @ApiOperation({ summary: 'Update a task by id' })
  @ApiResponse({ status: 200, description: 'The task has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @Res() res: Response) {
    return super.update(id, updateTaskDto, res);
  }

  @ApiOperation({ summary: 'Delete a task by id' })
  @ApiResponse({ status: 200, description: 'The task has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    return super.remove(id, res);
  }
}
