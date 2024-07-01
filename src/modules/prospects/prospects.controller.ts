import ResponsesHelper from "@helpers/responses.helpers";
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { ProspectsService } from './prospects.service';
import { CreateProspectDto } from './dto/create-prospect.dto';
import { UpdateProspectDto } from './dto/update-prospect.dto';
import { AppController } from '@modules/app.controller';
import { Prospect, ProspectDocument } from './entities/prospect.entity';
import { Response } from "express";
import { log } from "console";
import { AuthGuard } from "@guards/auth.guard";
import { CustomFieldsService } from "@modules/custom-fields/custom-fields.service";
import { Ownership } from "@decorators/ownership.decorator";
import { Roles } from "@decorators/roles.decorator";
import RoleEnum from "@enums/role.enum";

@Controller('prospects')
export class ProspectsController extends AppController<ProspectDocument, CreateProspectDto, UpdateProspectDto>{

  constructor(
      private readonly prospectsService: ProspectsService,
      private readonly customsFieldsService: CustomFieldsService
  ) {
      super(prospectsService, "prospects");
  }

  @Ownership()
  @Roles(RoleEnum.ADMIN)
  @UseGuards(AuthGuard)
  @Get("me")
  async findAllOwner(@Res() res: Response, @Req() req: Request) {
    const customer = req['customer'];

    try {
      const data = await this.prospectsService.findWhere({where: {ownerId: customer._id.toString() }});
      if (!data || data.length === 0) {
        throw new Error("Not Found");
      }
      return this.responsesHelper.getResponse({
        res,
        path: "findAllOwner",
        method: "Get",
        code: HttpStatus.OK,
        subject: "prospects",
        data,
      });
    } catch (error) {
      if (error.message === "Not Found") {
        return this.responsesHelper.getResponse({
          res,
          path: "findAllOwner",
          method: "Get",
          code: HttpStatus.NOT_FOUND,
          subject: "prospects",
          data: error.message,
        });
      } else {
        console.error("AppController > findAllOwner : ", error);
        return this.responsesHelper.getResponse({
          res,
          path: "findAllOwner",
          method: "Get",
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          subject: "prospects",
          data: error.message,
        });
      }
    }
  }


}
