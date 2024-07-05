import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';

@Injectable()
export abstract class AppService<AppModel extends Document, CreateDto, UpdateDto> {
  constructor(
    @InjectModel('AppModelName') private readonly appModel: Model<AppModel>,
    private readonly populate: Array<string> = []
  ) {}

  async create(createDto: CreateDto): Promise<AppModel> {
    try {
      const createdModel = new this.appModel({
        ...createDto,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      await createdModel.save();
      return this.populateModel(createdModel);
    } catch (error) {
      console.error("AppService > create : ", error);
      throw error;
    }
  }

  async findAll(): Promise<AppModel[]> {
    return this.appModel.find().populate(this.populate).exec();
  }

  async findOne(id: string): Promise<AppModel> {
    console.log("FIND ONE");
    
    const model = await this.appModel.findById(id).populate(this.populate).exec();
    return this.populateModel(model);
  }

  async update(id: string, updateDto: UpdateDto): Promise<AppModel> {
    try {
      const updatedModel = await this.appModel.findByIdAndUpdate(id, updateDto, { new: true }).populate(this.populate).exec();
      return this.populateModel(updatedModel);
    } catch (error) {
      console.error("AppService > update : ", error);
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    await this.appModel.findByIdAndDelete(id).exec();
  }

  async findWhere({ where, sort }: { where: object, sort?: string }): Promise<AppModel[]> {
    console.log("FIND WHERE");
    return this.appModel.find(where).sort(sort).populate(this.populate).exec();
  }

  async updateMany(where: object, updateDto: UpdateDto): Promise<any> {
    try {
      return await this.appModel.updateMany(where, updateDto).exec();
    } catch (error) {
      console.error("AppService > updateMany : ", error);
      throw error;
    }
  }

  protected async populateModel(model: AppModel): Promise<AppModel> {
    return model;
  }
}
