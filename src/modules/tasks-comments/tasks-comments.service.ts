import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskComment, TaskCommentDocument } from '@modules/tasks-comments/entities/tasks-comment.entity';
import { CreateTaskCommentDto } from '@modules/tasks-comments/dto/create-tasks-comment.dto';
import { UpdateTaskCommentDto } from '@modules/tasks-comments/dto/update-tasks-comment.dto';

@Injectable()
export class TaskCommentsService {
  constructor(@InjectModel(TaskComment.name) private taskCommentModel: Model<TaskCommentDocument>) {}

  async create(createTaskCommentDto: CreateTaskCommentDto): Promise<TaskComment> {
    const createdTaskComment = new this.taskCommentModel(createTaskCommentDto);
    return createdTaskComment.save();
  }

  async findAll(): Promise<TaskComment[]> {
    return this.taskCommentModel.find().exec();
  }

  async findOne(id: string): Promise<TaskComment> {
    return this.taskCommentModel.findById(id).exec();
  }

  async update(id: string, updateTaskCommentDto: UpdateTaskCommentDto): Promise<TaskComment> {
    return this.taskCommentModel.findByIdAndUpdate(id, updateTaskCommentDto, { new: true }).exec();
  }

  async remove(id: string): Promise<TaskComment> {
    return this.taskCommentModel.findByIdAndDelete(id).exec();
  }
}
