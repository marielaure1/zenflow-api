import ResponsesHelper from "@helpers/responses.helpers";
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseGuards, Req, Put } from '@nestjs/common';
import { CustomFieldsService } from './custom-fields.service';
import { CreateCustomFieldDto } from './dto/create-custom-field.dto';
import { UpdateCustomFieldDto } from './dto/update-custom-field.dto';
import { AppController } from '@modules/app.controller';
import { CustomField, CustomFieldDocument } from './entities/custom-field.entity';
import { Response } from "express";
import { log } from "console";
import { AuthGuard } from "@guards/auth.guard";

@Controller('custom-fields')
export class CustomFieldsController extends AppController<CustomFieldDocument, CreateCustomFieldDto, UpdateCustomFieldDto>{

  constructor(
      private readonly customFieldsService: CustomFieldsService
  ) {
      super(customFieldsService, "custom-fields");
  }

  @Get("me/:schema")
  @UseGuards(AuthGuard)
  async findAllOwnerCustomsFields(@Res() res: Response, @Req() req: Request, @Param('schema') schema: string) {
    const customer = req['customer'];

    try {
      const data = await this.customFieldsService.findWhere({
        where: {
          ownerId: customer._id.toString(),
          schema,
        },
        sort: "position"
      })
      

      if (!data || data.length === 0) {
        throw new Error("Not Found");
      }
      return this.responsesHelper.getResponse({
        res,
        path: "findAllOwnerCustomsFields",
        method: "Get",
        code: HttpStatus.OK,
        subject: "customfields",
        data,
      });
    } catch (error) {
      if (error.message === "Not Found") {
        return this.responsesHelper.getResponse({
          res,
          path: "findAllOwnerCustomsFields",
          method: "Get",
          code: HttpStatus.NOT_FOUND,
          subject: "customfields",
          data: error.message,
        });
      } else {
        console.error("ClientsController > findAllOwnerCustomsFields : ", error);
        return this.responsesHelper.getResponse({
          res,
          path: "findAllOwnerCustomsFields",
          method: "Get",
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          subject: "customfields",
          data: error.message,
        });
      }
    }
  }

  @Get(":id/me/:schema")
  @UseGuards(AuthGuard)
  async findOneOwnerCustomsFields(@Res() res: Response, @Req() req: Request, @Param('id') id: string, @Param('schema') schema: string) {
    const customer = req['customer'];

    try {
      const data = await this.customFieldsService.findWhere({
        where: {
          ownerId: customer._id.toString(),
          schema,
          $or: [
            {schemaIds: [id]}
          ]  
        }
      });

      console.log(data);
      

      if (!data || data.length === 0) {
        throw new Error("Not Found");
      }
      return this.responsesHelper.getResponse({
        res,
        path: "findOneOwnerCustomsFields",
        method: "Get",
        code: HttpStatus.OK,
        subject: "customfields",
        data,
      });
    } catch (error) {
      if (error.message === "Not Found") {
        return this.responsesHelper.getResponse({
          res,
          path: "findOneOwnerCustomsFields",
          method: "Get",
          code: HttpStatus.NOT_FOUND,
          subject: "customfields",
          data: error.message,
        });
      } else {
        console.error("CustomFieldsController > findOneOwnerCustomsFields : ", error);
        return this.responsesHelper.getResponse({
          res,
          path: "findOneOwnerCustomsFields",
          method: "Get",
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          subject: "customfields",
          data: error.message,
        });
      }
    }
  }

  @Put("me/:schema")
  @UseGuards(AuthGuard)
  async updatePositions(@Body() updateCustomFieldDtos: UpdateCustomFieldDto[], @Res() res: Response, @Req() req: Request, @Param('schema') schema: string) {
    const customer = req['customer'];
    
    try {
      const result = await this.customFieldsService.updatePositions(updateCustomFieldDtos);
      const data = await this.customFieldsService.findWhere({
        where: {
          ownerId: customer._id.toString(),
          schema,
        },
        sort: "position"
      })

      return this.responsesHelper.getResponse({
        res,
        path: "updatePositions",
        method: "Put",
        code: HttpStatus.OK,
        subject: "customfields",
        data: data,
      });
    } catch (error) {
      console.error('CustomFieldsController > updatePositions : ', error);
      return this.responsesHelper.getResponse({
        res,
        path: "updatePositions",
        method: "Put",
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        subject: "customfields",
        data: error.message,
      });
    }
  }

}
