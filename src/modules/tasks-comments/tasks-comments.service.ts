import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskComment, TaskCommentDocument } from '@modules/tasks-comments/entities/tasks-comment.entity';
import { CreateTaskCommentDto } from '@modules/tasks-comments/dto/create-tasks-comment.dto';
import { UpdateTaskCommentDto } from '@modules/tasks-comments/dto/update-tasks-comment.dto';
import { AppService } from '@modules/app.service';

@Injectable()
export class TaskCommentsService extends AppService<TaskCommentDocument, CreateTaskCommentDto, UpdateTaskCommentDto>{
  
  constructor(@InjectModel(TaskComment.name) private taskCommentsModel: Model<TaskCommentDocument>) {
    super(taskCommentsModel);
  }
}
