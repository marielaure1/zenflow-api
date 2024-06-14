import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Team, TeamDocument } from '@modules/teams/entities/team.entity';
import { CreateTeamDto } from '@modules/teams/dto/create-team.dto';
import { UpdateTeamDto } from '@modules/teams/dto/update-team.dto';
import { AppService } from '@modules/app.service';

@Injectable()
export class TeamsService extends AppService<TeamDocument, CreateTeamDto, UpdateTeamDto>{

  constructor(@InjectModel(Team.name) private teamModel: Model<TeamDocument>) {
    super(teamModel);
  }
}
