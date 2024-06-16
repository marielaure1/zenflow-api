import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskCategorie, TaskCategorieDocument } from '@modules/task-categories/entities/task-categorie.entity';
import { CreateTaskCategorieDto } from '@modules/task-categories/dto/create-task-categorie.dto';
import { UpdateTaskCategorieDto } from '@modules/task-categories/dto/update-task-categorie.dto';
import { AppService } from '@modules/app.service';

@Injectable()
export class TaskCategoriesService extends AppService<TaskCategorieDocument, CreateTaskCategorieDto, UpdateTaskCategorieDto>{
  
  constructor(@InjectModel(TaskCategorie.name) private taskCategoryModel: Model<TaskCategorieDocument>) {
    super(taskCategoryModel);
  }

}
