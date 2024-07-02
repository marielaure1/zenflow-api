import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseGuards, Req, Put } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { AppController } from '@modules/app.controller';
import { Client, ClientDocument } from './entities/client.entity';
import { Response, Request } from "express";
import { AuthGuard } from "@guards/auth.guard";
import { Roles } from '@decorators/roles.decorator';
import RoleEnum from '@enums/role.enum';
import { Ownership } from '@decorators/ownership.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('clients')
@Controller('clients')
export class ClientsController extends AppController<ClientDocument, CreateClientDto, UpdateClientDto>{

  constructor(
    private readonly clientsService: ClientsService
  ) {
    super(clientsService, "clients");
  }

  @ApiOperation({ summary: 'Create a new client' })
  @ApiResponse({ status: 201, description: 'The client has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBearerAuth()
  @Post()
  async create(@Body() createClientDto: CreateClientDto, @Res() res: Response) {
    return super.create(createClientDto, res);
  }

  @ApiOperation({ summary: 'Get all clients' })
  @ApiResponse({ status: 200, description: 'Return all clients.' })
  @ApiResponse({ status: 404, description: 'Clients not found.' })
  @Get()
  async findAll(@Res() res: Response) {
    return super.findAll(res);
  }

  @ApiOperation({ summary: 'Get a client by id' })
  @ApiResponse({ status: 200, description: 'Return a client.' })
  @ApiResponse({ status: 404, description: 'Client not found.' })
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    return super.findOne(id, res);
  }

  @ApiOperation({ summary: 'Update a client by id' })
  @ApiResponse({ status: 200, description: 'The client has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Client not found.' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto, @Res() res: Response) {
    return super.update(id, updateClientDto, res);
  }

  @ApiOperation({ summary: 'Delete a client by id' })
  @ApiResponse({ status: 200, description: 'The client has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Client not found.' })
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    return super.remove(id, res);
  }

  @ApiOperation({ summary: 'Get all clients for the current owner' })
  @ApiResponse({ status: 200, description: 'Return all clients for the current owner.' })
  @ApiResponse({ status: 404, description: 'Clients not found.' })
  @Ownership()
  @Roles(RoleEnum.ADMIN)
  @UseGuards(AuthGuard)
  @Get("me")
  async findAllOwner(@Res() res: Response, @Req() req: Request) {
    const customer = req['customer'];

    try {
      const data = await this.clientsService.findWhere({ where: { ownerId: customer._id.toString() } });
      if (!data || data.length === 0) {
        throw new Error("Not Found");
      }
      return this.responsesHelper.getResponse({
        res,
        path: "findAllOwner",
        method: "Get",
        code: HttpStatus.OK,
        subject: "clients",
        data,
      });
    } catch (error) {
      if (error.message === "Not Found") {
        return this.responsesHelper.getResponse({
          res,
          path: "findAllOwner",
          method: "Get",
          code: HttpStatus.NOT_FOUND,
          subject: "clients",
          data: error.message,
        });
      } else {
        console.error("AppController > findAllOwner : ", error);
        return this.responsesHelper.getResponse({
          res,
          path: "findAllOwner",
          method: "Get",
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          subject: "clients",
          data: error.message,
        });
      }
    }
  }
}
