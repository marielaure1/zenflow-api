import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { log } from 'console';
import { Model, Document, Types } from 'mongoose';

@Injectable()
export abstract class AppService<AppModel extends Document, CreateDto, UpdateDto> {
  constructor(
    @InjectModel('AppModelName') private readonly appModel: Model<AppModel>,
    private readonly populate: Array<string> = []
  ) {}

  async create(createDto: CreateDto): Promise<AppModel> {
    try {
      const { relations, ...data } = createDto as any;
      const createdModel = new this.appModel({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      await createdModel.save();

      if (relations) {
        await this.addMultipleRelations(createdModel._id, relations);
      }

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
    const model = await this.appModel.findById(id).populate(this.populate).exec();
    return this.populateModel(model);
  }

  async update(id: string, updateDto: UpdateDto): Promise<AppModel> {
    try {
      const { relations, ...data } = updateDto as any;
      const updatedModel = await this.appModel.findByIdAndUpdate(id, data, { new: true }).populate(this.populate).exec();

      if (relations) {
        await this.addMultipleRelations(id, relations);
      }

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
    return this.appModel.find(where).sort(sort).populate(this.populate).exec();
  }

  async updateMany(where: object, updateDto: UpdateDto): Promise<any> {
    try {
      const { relations, ...data } = updateDto as any;
      const result = await this.appModel.updateMany(where, data).exec();

      if (relations) {
        const updatedModels = await this.appModel.find(where).exec();
        for (const model of updatedModels) {
          await this.addMultipleRelations(model._id, relations);
        }
      }

      return result;
    } catch (error) {
      console.error("AppService > updateMany : ", error);
      throw error;
    }
  }

  protected async populateModel(model: AppModel): Promise<AppModel> {
    return model;
  }

  protected async addRelation(parentId: string, relatedId: string, relationField: string): Promise<AppModel> {
    const parent = await this.findOne(parentId);
    if (!parent[relationField]) {
      parent[relationField] = [];
    }
    if (!parent[relationField].includes(Types.ObjectId.createFromHexString(relatedId))) {
      parent[relationField].push(Types.ObjectId.createFromHexString(relatedId));
      await parent.save();
    }
    return parent;
  }

  protected async removeRelation(parentId: string, relatedId: string, relationField: string): Promise<AppModel> {
    const parent = await this.findOne(parentId);
    parent[relationField] = parent[relationField].filter(id => id.toString() !== relatedId);
    await parent.save();
    return parent;
  }

  protected async addMultipleRelations(parentId: string, relations: { [key: string]: string[] }): Promise<AppModel> {
    const parent = await this.findOne(parentId);
    for (const [relationField, relatedIds] of Object.entries(relations)) {
      if (!parent[relationField]) {
        parent[relationField] = [];
      }
      for (const relatedId of relatedIds) {
        if (!parent[relationField].includes(Types.ObjectId.createFromHexString(relatedId))) {
          parent[relationField].push(Types.ObjectId.createFromHexString(relatedId));
        }
      }
    }
    await parent.save();
    return parent;
  }

  protected async removeMultipleRelations(parentId: string, relations: { [key: string]: string[] }): Promise<AppModel> {
    const parent = await this.findOne(parentId);
    for (const [relationField, relatedIds] of Object.entries(relations)) {
      parent[relationField] = parent[relationField].filter(id => !relatedIds.includes(id.toString()));
    }
    await parent.save();
    return parent;
  }
}
