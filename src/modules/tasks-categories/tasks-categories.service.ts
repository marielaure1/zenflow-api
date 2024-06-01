import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskCategory, TaskCategoryDocument } from './entities/task-category.entity';
import { CreateTaskCategoryDto } from './dto/create-task-category.dto';
import { UpdateTaskCategoryDto } from './dto/update-task-category.dto';

@Injectable()
export class TaskCategoriesService {
  constructor(@InjectModel(TaskCategory.name) private taskCategoryModel: Model<TaskCategoryDocument>) {}

  async create(createTaskCategoryDto: CreateTaskCategoryDto): Promise<TaskCategory> {
    const createdTaskCategory = new this.taskCategoryModel(createTaskCategoryDto);
    return createdTaskCategory.save();
  }

  async findAll(): Promise<TaskCategory[]> {
    return this.taskCategoryModel.find().exec();
  }

  async findOne(id: string): Promise<TaskCategory> {
    return this.taskCategoryModel.findById(id).exec();
  }

  async update(id: string, updateTaskCategoryDto: UpdateTaskCategoryDto): Promise<TaskCategory> {
    return this.taskCategoryModel.findByIdAndUpdate(id, updateTaskCategoryDto, { new: true }).exec();
  }

  async remove(id: string): Promise<TaskCategory> {
    return this.taskCategoryModel.findByIdAndDelete(id).exec();
  }
}
