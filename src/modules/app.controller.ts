import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Patch, 
  Delete, 
  Body,
  Param,
  Res,
  HttpStatus
} from '@nestjs/common';
import { Model, Document } from 'mongoose';
import { AppService } from '@modules/app.service';
import { Response } from 'express';
import ResponsesHelper from "@helpers/responses.helpers";
@Controller()
export abstract class AppController<Service extends AppService<AppModel, CreateDto, UpdateDto>, AppModel, CreateDto, UpdateDto> {
  private readonly schema :string;
  public responsesHelper: ResponsesHelper;
  
  constructor(
    private readonly service: Service,
    schema :string
  ) {
    this.schema = schema;
    this.responsesHelper = new ResponsesHelper();
  }

  @Post()
  async create(@Body() createDto: CreateDto, @Res() res: Response) {
    try {
      const data = await this.service.create(createDto);
      return this.responsesHelper.getResponse({
        res,
        path: "create",
        method: "Post",
        code: HttpStatus.CREATED,
        subject: this.schema,
        data
      });
    } catch (error) {
      console.error("AppController > create : ", error);
      return this.responsesHelper.getResponse({
        res,
        path: "create",
        method: "Post",
        code: HttpStatus.INTERNAL_SERVER_ERROR, 
        subject: this.schema,
        data: error.message
      });
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const data = await this.service.findAll();
      return this.responsesHelper.getResponse({
        res,
        path: "findAll",
        method: "Get",
        code: HttpStatus.OK,
        subject: this.schema,
        data
      });
    } catch (error) {
      console.error("AppController > findAll : ", error);
      return this.responsesHelper.getResponse({
        res,
        path: "findAll",
        method: "Get",
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        subject: this.schema,
        data: error.message
      });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.service.findOne(id);
      return this.responsesHelper.getResponse({
        res,
        path: "findOne",
        method: "Get",
        code: HttpStatus.OK,
        subject: this.schema,
        data
      });
    } catch (error) {
      console.error("AppController > findOne : ", error);
      return this.responsesHelper.getResponse({
        res,
        path: "findOne",
        method: "Get",
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        subject: this.schema,
        data: error.message
      });
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateDto, @Res() res: Response) {
    try {
      const data = await this.service.update(id, updateDto);
      return this.responsesHelper.getResponse({
        res,
        path: "update",
        method: "Put",
        code: HttpStatus.OK,
        subject: this.schema,
        data
      });
    } catch (error) {
      console.error("AppController > update : ", error);
      return this.responsesHelper.getResponse({
        res,
        path: "update",
        method: "Put",
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        subject: this.schema,
        data: error.message
      });
    }
  }
  

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.service.remove(id);
      return this.responsesHelper.getResponse({
        res,
        path: "remove",
        method: "Delete",
        code: HttpStatus.OK,
        subject: this.schema,
        data: { message: 'Deleted successfully' }
      });
    } catch (error) {
      console.error("AppController > remove : ", error);
      return this.responsesHelper.getResponse({
        res,
        path: "remove",
        method: "Delete",
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        subject: this.schema,
        data: error.message
      });
    }
  }
}
