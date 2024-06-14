import ResponsesHelper from "@helpers/responses.helpers";
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { AppController } from '@modules/app.controller';
import { Client, ClientDocument } from './entities/client.entity';
import { Response } from "express";
import { log } from "console";

@Controller('clients')
export class ClientsController extends AppController<ClientDocument, CreateClientDto, UpdateClientDto>{

  constructor(
      private readonly clientsService: ClientsService
  ) {
      super(clientsService, "clients");
  }

}
