import { UpdateCustomFieldDto } from '@modules/custom-fields/dto/update-custom-field.dto';
import ResponsesHelper from "@helpers/responses.helpers";
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseGuards, Req, Put } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { AppController } from '@modules/app.controller';
import { Client, ClientDocument } from './entities/client.entity';
import { Response, Request } from "express";
import { log } from "console";
import { AuthGuard } from "@guards/auth.guard";
import { CustomField } from "@entities/custom-fields.entity";
import { CustomersService } from "@modules/customers/customers.service";
import { CustomFieldsService } from "@modules/custom-fields/custom-fields.service";
import { AuthMiddleware } from '@middleware/auth/auth.middleware';
import { Roles } from '@decorators/roles.decorator';
import RoleEnum from '@enums/role.enum';
import { Ownership } from '@decorators/ownership.decorator';

@Controller('clients')
export class ClientsController extends AppController<ClientDocument, CreateClientDto, UpdateClientDto>{

  constructor(
      private readonly clientsService: ClientsService,
      private readonly customsFieldsService: CustomFieldsService
  ) {
      super(clientsService, "clients");
  }

  // 
  @Ownership()
  @Roles(RoleEnum.ADMIN)
  @UseGuards(AuthGuard)
  @Get("me")
  async findAllOwner(@Res() res: Response, @Req() req: Request) {
    const customer = req['customer'];

    try {
      const data = await this.clientsService.findWhere({where: {ownerId: customer._id.toString() }});
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

  // @Get(':id/me/custom-fields')
  // @UseGuards(AuthGuard)
  // async findAllOwnerCustomsFieldsService(@Res() res: Response, @Req() req: Request, @Param('id') id: string) {
  //   const ownerId = req['customer']._id.toString();

  //   try {
  //     const query: any = {
  //       schema: 'Clients',
  //       ownerId: ownerId,
  //     };

  //     const data = await this.customsFieldsService.findWhere(query);

  //     if (!filteredData || filteredData.length === 0) {
  //       throw new Error('Not Found');
  //     }

  //     return this.responsesHelper.getResponse({
  //       res,
  //       path: 'findAllOwnerCustomsFields',
  //       method: 'Get',
  //       code: HttpStatus.OK,
  //       subject: 'clients',
  //       data: filteredData,
  //     });
  //   } catch (error) {
  //     if (error.message === 'Not Found') {
  //       return this.responsesHelper.getResponse({
  //         res,
  //         path: 'findAllOwnerCustomsFields',
  //         method: 'Get',
  //         code: HttpStatus.NOT_FOUND,
  //         subject: 'clients',
  //         data: error.message,
  //       });
  //     } else {
  //       console.error('ClientsController > findAllOwnerCustomsFields : ', error);
  //       return this.responsesHelper.getResponse({
  //         res,
  //         path: 'findAllOwnerCustomsFields',
  //         method: 'Get',
  //         code: HttpStatus.INTERNAL_SERVER_ERROR,
  //         subject: 'clients',
  //         data: error.message,
  //       });
  //     }
  //   }
  // }


}
