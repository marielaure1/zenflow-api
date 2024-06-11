import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskCategory, TaskCategoryDocument } from './entities/tasks-category.entity';
import { CreateTaskCategoryDto } from './dto/create-tasks-category.dto';
import { UpdateTaskCategoryDto } from './dto/update-tasks-category.dto';
import { AppService } from '@modules/app.service';

@Injectable()
export class TaskCategoriesService extends AppService<TaskCategoryDocument, CreateTaskCategoryDto, UpdateTaskCategoryDto>{
  
  constructor(@InjectModel(TaskCategory.name) private taskCategoryModel: Model<TaskCategoryDocument>) {
    super(taskCategoryModel);
  }

}
