import ResponsesHelper from "@helpers/responses.helpers";
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { AppController } from '@modules/app.controller';
import { Team, TeamDocument } from './entities/team.entity';
import { Response } from "express";
import { log } from "console";

@Controller('teams')
export class TeamsController extends AppController<TeamDocument, CreateTeamDto, UpdateTeamDto>{

  constructor(
      private readonly teamsService: TeamsService
  ) {
      super(teamsService, "teams");
  }

}
