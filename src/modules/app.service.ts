import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';

@Injectable()
export abstract class AppService<AppModel, CreateDto, UpdateDto> {
  
  private appModel: Model<AppModel>;

  constructor(appModel: Model<AppModel>) {
    this.appModel = appModel;
  }

  async create(createDto: CreateDto): Promise<AppModel> {
    try{
      const createdModel = await new this.appModel({
        ...createDto,
        createdAt: new Date()
      }).save() as AppModel;
      
      return createdModel;
    } catch(error){
      console.error("AppService > create : ", error);
      
    }
  }

  async findAll(): Promise<AppModel[]> {
    return this.appModel.find().exec();
  }

  async findOne(id: string): Promise<AppModel> {
    return this.appModel.findById(id).exec();
  }

  async update(id: string, updateDto: UpdateDto): Promise<AppModel> {
    return this.appModel.findByIdAndUpdate(id, updateDto).exec();
  }

  async remove(id: string): Promise<void> {
    await this.appModel.findByIdAndRemove(id).exec();
  }
}

