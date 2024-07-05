import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseGuards, Req, Put } from '@nestjs/common';
import { ProspectsService } from './prospects.service';
import { CreateProspectDto } from './dto/create-prospect.dto';
import { UpdateProspectDto } from './dto/update-prospect.dto';
import { AppController } from '@modules/app.controller';
import { Prospect, ProspectDocument } from './entities/prospect.entity';
import { Response, Request } from "express";
import { AuthGuard } from "@guards/auth.guard";
import { Roles } from '@decorators/roles.decorator';
import RoleEnum from '@enums/role.enum';
import { Ownership } from '@decorators/ownership.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('prospects')
@Controller('prospects')
export class ProspectsController extends AppController<ProspectDocument, CreateProspectDto, UpdateProspectDto>{

  constructor(
    private readonly prospectsService: ProspectsService
  ) {
    super(prospectsService, "prospects");
  }

  @ApiOperation({ summary: 'Create a new prospect' })
  @ApiResponse({ status: 201, description: 'The prospect has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBearerAuth()
  @Post()
  async create(@Body() createProspectDto: CreateProspectDto, @Res() res: Response) {
    return super.create(createProspectDto, res);
  }

  @ApiOperation({ summary: 'Get all prospects' })
  @ApiResponse({ status: 200, description: 'Return all prospects.' })
  @ApiResponse({ status: 404, description: 'Prospects not found.' })
  @Get()
  async findAll(@Res() res: Response) {
    return super.findAll(res);
  }

  @ApiOperation({ summary: 'Get a prospect by id' })
  @ApiResponse({ status: 200, description: 'Return a prospect.' })
  @ApiResponse({ status: 404, description: 'Prospect not found.' })
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    return super.findOne(id, res);
  }

  @ApiOperation({ summary: 'Update a prospect by id' })
  @ApiResponse({ status: 200, description: 'The prospect has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Prospect not found.' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProspectDto: UpdateProspectDto, @Res() res: Response) {
    return super.update(id, updateProspectDto, res);
  }

  @ApiOperation({ summary: 'Delete a prospect by id' })
  @ApiResponse({ status: 200, description: 'The prospect has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Prospect not found.' })
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    return super.remove(id, res);
  }

  @ApiOperation({ summary: 'Get all prospects for the current owner' })
  @ApiResponse({ status: 200, description: 'Return all prospects for the current owner.' })
  @ApiResponse({ status: 404, description: 'Prospects not found.' })
  @Ownership()
  @Roles(RoleEnum.ADMIN)
  @UseGuards(AuthGuard)
  @Get("me/all")
  async findAllOwner(@Res() res: Response, @Req() req: Request) {
    const customer = req['customer'];

    try {
      const data = await this.prospectsService.findWhere({ where: { ownerId: customer._id.toString() } });
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
