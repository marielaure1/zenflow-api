import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from '@modules/tasks/tasks.service';
import { CreateTaskDto } from '@modules/tasks/dto/create-task.dto';
import { UpdateTaskDto } from '@modules/tasks/dto/update-task.dto';
import { AppController } from '@modules/app.controller';
import ResponsesHelper from "@helpers/responses.helpers";
import { Task, TaskDocument } from '@modules/tasks/entities/task.entity';

@Controller('tasks')
export class TasksController extends AppController<TaskDocument, CreateTaskDto, UpdateTaskDto>{

  constructor(
      private readonly tasksService: TasksService,
  ) {
      super(tasksService, "tasks");
      this.responsesHelper = new ResponsesHelper();
  }
}
