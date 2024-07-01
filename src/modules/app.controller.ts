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
import { Document } from 'mongoose';
import { AppService } from '@modules/app.service';
import { Response } from 'express';
import ResponsesHelper from "@helpers/responses.helpers";
import { ValidationError } from 'class-validator';
import { log } from 'console';

@Controller()
export abstract class AppController<AppModel extends Document, CreateDto, UpdateDto> {
  private readonly schema: string;
  public responsesHelper: ResponsesHelper;

  constructor(
    private readonly service: AppService<AppModel, CreateDto, UpdateDto>,
    schema: string
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
        data,
      });
    } catch (error) {
      if (Array.isArray(error) && error[0] instanceof ValidationError) {
        return this.responsesHelper.getResponse({
          res,
          path: "create",
          method: "Post",
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          subject: this.schema,
          data: error,
        });
      } else {
        console.error("AppController > create : ", error);
        return this.responsesHelper.getResponse({
          res,
          path: "create",
          method: "Post",
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          subject: this.schema,
          data: error.message,
        });
      }
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const data = await this.service.findAll();
      if (!data || data.length === 0) {
        throw new Error("Not Found");
      }
      return this.responsesHelper.getResponse({
        res,
        path: "findAll",
        method: "Get",
        code: HttpStatus.OK,
        subject: this.schema,
        data,
      });
    } catch (error) {
      if (error.message === "Not Found") {
        return this.responsesHelper.getResponse({
          res,
          path: "findAll",
          method: "Get",
          code: HttpStatus.NOT_FOUND,
          subject: this.schema,
          data: error.message,
        });
      } else {
        console.error("AppController > findAll : ", error);
        return this.responsesHelper.getResponse({
          res,
          path: "findAll",
          method: "Get",
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          subject: this.schema,
          data: error.message,
        });
      }
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.service.findOne(id);
      if (!data) {
        throw new Error("Not Found");
      }
      return this.responsesHelper.getResponse({
        res,
        path: "findOne",
        method: "Get",
        code: HttpStatus.OK,
        subject: this.schema,
        data,
      });
    } catch (error) {
      if (error.message === "Not Found") {
        return this.responsesHelper.getResponse({
          res,
          path: "findOne",
          method: "Get",
          code: HttpStatus.NOT_FOUND,
          subject: this.schema,
          data: error.message,
        });
      } else {
        console.error("AppController > findOne : ", error);
        return this.responsesHelper.getResponse({
          res,
          path: "findOne",
          method: "Get",
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          subject: this.schema,
          data: error.message,
        });
      }
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateDto, @Res() res: Response) {
    try {
      const data = await this.service.update(id, updateDto);
      if (!data) {
        throw new Error("Not Found");
      }
      return this.responsesHelper.getResponse({
        res,
        path: "update",
        method: "Put",
        code: HttpStatus.OK,
        subject: this.schema,
        data,
      });
    } catch (error) {
      console.log(error);
      
      if (Array.isArray(error) && error[0] instanceof ValidationError) {
        return this.responsesHelper.getResponse({
          res,
          path: "update",
          method: "Put",
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          subject: this.schema,
          data: error,
        });
      } else if (error.message === "Not Found") {
        return this.responsesHelper.getResponse({
          res,
          path: "update",
          method: "Put",
          code: HttpStatus.NOT_FOUND,
          subject: this.schema,
          data: error.message,
        });
      } else {
        console.error("AppController > update : ", error);
        return this.responsesHelper.getResponse({
          res,
          path: "update",
          method: "Put",
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          subject: this.schema,
          data: error.message,
        });
      }
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const isFind = await this.service.findOne(id);
      if (!isFind) {
        return this.responsesHelper.getResponse({
          res,
          path: "remove",
          method: "Delete",
          code: HttpStatus.NOT_FOUND,
          subject: this.schema,
          data: {},
        });
      }

      await this.service.remove(id); 

      return this.responsesHelper.getResponse({
        res,
        path: "remove",
        method: "Delete",
        code: HttpStatus.OK,
        subject: this.schema,
        data: { removed: true }, 
      });
    } catch (error) {
      console.error("AppController > remove : ", error);
      return this.responsesHelper.getResponse({
        res,
        path: "remove",
        method: "Delete",
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        subject: this.schema,
        data: error.message,
      });
    }
  }
}
