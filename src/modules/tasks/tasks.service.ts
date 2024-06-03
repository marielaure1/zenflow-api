import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from '@modules/tasks/entities/task.entity';
import { CreateTaskDto } from '@modules/tasks/dto/create-task.dto';
import { UpdateTaskDto } from '@modules/tasks/dto/update-task.dto';
import { AppService } from '@modules/app.service';

@Injectable()
export class TasksService  extends AppService<TaskDocument, CreateTaskDto, UpdateTaskDto>{
  
  constructor(@InjectModel(Task.name) private tasksModel: Model<TaskDocument>) {
    super(tasksModel);
  }
}
