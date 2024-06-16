import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskComment, TaskCommentDocument } from '@modules/task-comments/entities/task-comment.entity';
import { CreateTaskCommentDto } from '@modules/task-comments/dto/create-task-comment.dto';
import { UpdateTaskCommentDto } from '@modules/task-comments/dto/update-task-comment.dto';
import { AppService } from '@modules/app.service';

@Injectable()
export class TaskCommentsService extends AppService<TaskCommentDocument, CreateTaskCommentDto, UpdateTaskCommentDto>{
  
  constructor(@InjectModel(TaskComment.name) private taskCommentsModel: Model<TaskCommentDocument>) {
    super(taskCommentsModel);
  }
}
