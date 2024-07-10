import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseGuards, Req, Put } from '@nestjs/common';
import { CustomFieldsService } from './custom-fields.service';
import { CreateCustomFieldDto } from './dto/create-custom-field.dto';
import { UpdateCustomFieldDto } from './dto/update-custom-field.dto';
import { AppController } from '@modules/app.controller';
import { CustomField, CustomFieldDocument } from './entities/custom-field.entity';
import { Response, Request } from "express";
import { AuthGuard } from "@guards/auth.guard";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { log } from 'console';

@ApiTags('custom-fields')
@Controller('custom-fields')
export class CustomFieldsController extends AppController<CustomFieldDocument, CreateCustomFieldDto, UpdateCustomFieldDto>{

  constructor(
    private readonly customFieldsService: CustomFieldsService
  ) {
    super(customFieldsService, "custom-fields");
  }

  @ApiOperation({ summary: 'Create a new custom field' })
  @ApiResponse({ status: 201, description: 'The custom field has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBearerAuth()
  @Post()
  async create(@Body() createCustomFieldDto: CreateCustomFieldDto, @Res() res: Response) {
    return super.create(createCustomFieldDto, res);
  }

  @ApiOperation({ summary: 'Get all custom fields' })
  @ApiResponse({ status: 200, description: 'Return all custom fields.' })
  @ApiResponse({ status: 404, description: 'Custom fields not found.' })
  @Get()
  async findAll(@Res() res: Response) {
    return super.findAll(res);
  }

  @ApiOperation({ summary: 'Get a custom field by id' })
  @ApiResponse({ status: 200, description: 'Return a custom field.' })
  @ApiResponse({ status: 404, description: 'Custom field not found.' })
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    return super.findOne(id, res);
  }

  @ApiOperation({ summary: 'Update a custom field by id' })
  @ApiResponse({ status: 200, description: 'The custom field has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Custom field not found.' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCustomFieldDto: UpdateCustomFieldDto, @Res() res: Response) {
    return super.update(id, updateCustomFieldDto, res);
  }

  @ApiOperation({ summary: 'Delete a custom field by id' })
  @ApiResponse({ status: 200, description: 'The custom field has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Custom field not found.' })
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    return super.remove(id, res);
  }

  @ApiOperation({ summary: 'Get all custom fields for the current owner and schema' })
  @ApiResponse({ status: 200, description: 'Return all custom fields for the current owner and schema.' })
  @ApiResponse({ status: 404, description: 'Custom fields not found.' })
  @UseGuards(AuthGuard)
  @Get("me/:schema")
  async findAllOwnerCustomsFields(@Res() res: Response, @Req() req: Request, @Param('schema') schema: string) {
    const customer = req['user_supabase'];

    try {
      const data = await this.customFieldsService.findWhere({
        where: {
          ownerId: customer.id.toString(),
          schema,
        },
        sort: "position"
      });

      if (!data || data.length === 0) {
        throw new Error("Not Found");
      }

      console.log("all", data);

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
        console.error("CustomFieldsController > findAllOwnerCustomsFields : ", error);
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

  @ApiOperation({ summary: 'Get a specific custom field for the current owner and schema' })
  @ApiResponse({ status: 200, description: 'Return the custom field for the current owner and schema.' })
  @ApiResponse({ status: 404, description: 'Custom field not found.' })
  @Get(":id/me/:schema")
  async findOneOwnerCustomsFields(@Res() res: Response, @Req() req: Request, @Param('id') id: string, @Param('schema') schema: string) {
    const customer = req['user_supabase'];

    try {
      const data = await this.customFieldsService.findWhere({
        where: {
          ownerId: customer.id.toString(),
          schema,
          $or: [
            { schemaIds: [id] }
          ]
        }
      });

      if (!data || data.length === 0) {
        throw new Error("Not Found");
      }

      console.log("one", data);
      
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

  @ApiOperation({ summary: 'Update positions of custom fields for the current owner and schema' })
  @ApiResponse({ status: 200, description: 'The positions of the custom fields have been successfully updated.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @UseGuards(AuthGuard)
  @Put("me/:schema")
  async updatePositions(@Body() updateCustomFieldDtos: UpdateCustomFieldDto[], @Res() res: Response, @Req() req: Request, @Param('schema') schema: string) {
    const customer = req['user_supabase'];

    try {
      const result = await this.customFieldsService.updatePositions(updateCustomFieldDtos);
      const data = await this.customFieldsService.findWhere({
        where: {
          ownerId: customer.id.toString(),
          schema,
        },
        sort: "position"
      });

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
