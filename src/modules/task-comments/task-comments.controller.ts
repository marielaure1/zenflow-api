import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskCommentsService } from '@modules/task-comments/task-comments.service';
import { CreateTaskCommentDto } from '@modules/task-comments/dto/create-task-comment.dto';
import { UpdateTaskCommentDto } from '@modules/task-comments/dto/update-task-comment.dto';
import { AppController } from '@modules/app.controller';
import ResponsesHelper from "@helpers/responses.helpers";
import { TaskComment, TaskCommentDocument } from '@modules/task-comments/entities/task-comment.entity';

@Controller('task-comments')
export class TaskCommentsController extends AppController<TaskCommentDocument, CreateTaskCommentDto, UpdateTaskCommentDto>{

  constructor(
      private readonly taskCommentsService: TaskCommentsService,
  ) {
      super(taskCommentsService, "taskCategories");
      this.responsesHelper = new ResponsesHelper();
  }
}
