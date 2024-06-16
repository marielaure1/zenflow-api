import ResponsesHelper from "@helpers/responses.helpers";
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { CustomFieldsService } from './custom-fields.service';
import { CreateCustomFieldDto } from './dto/create-custom-field.dto';
import { UpdateCustomFieldDto } from './dto/update-custom-field.dto';
import { AppController } from '@modules/app.controller';
import { CustomField, CustomFieldDocument } from './entities/custom-field.entity';
import { Response } from "express";
import { log } from "console";

@Controller('custom-fields')
export class CustomFieldsController extends AppController<CustomFieldDocument, CreateCustomFieldDto, UpdateCustomFieldDto>{

  constructor(
      private readonly customFieldsService: CustomFieldsService
  ) {
      super(customFieldsService, "custom-field");
  }

}
