import ResponsesHelper from "@helpers/responses.helpers";
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { ProspectsService } from './prospects.service';
import { CreateProspectDto } from './dto/create-prospect.dto';
import { UpdateProspectDto } from './dto/update-prospect.dto';
import { AppController } from '@modules/app.controller';
import { Prospect, ProspectDocument } from './entities/prospect.entity';
import { Response } from "express";
import { log } from "console";

@Controller('prospects')
export class ProspectsController extends AppController<ProspectDocument, CreateProspectDto, UpdateProspectDto>{

  constructor(
      private readonly prospectsService: ProspectsService
  ) {
      super(prospectsService, "prospects");
  }

}
