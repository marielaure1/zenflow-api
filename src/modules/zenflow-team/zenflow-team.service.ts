import { Injectable } from '@nestjs/common';
import { CreateZenflowTeamDto } from './dto/create-zenflow-team.dto';
import { UpdateZenflowTeamDto } from './dto/update-zenflow-team.dto';

@Injectable()
export class ZenflowTeamService {
  create(createZenflowTeamDto: CreateZenflowTeamDto) {
    return 'This action adds a new zenflowTeam';
  }

  findAll() {
    return `This action returns all zenflowTeam`;
  }

  findOne(id: number) {
    return `This action returns a #${id} zenflowTeam`;
  }

  update(id: number, updateZenflowTeamDto: UpdateZenflowTeamDto) {
    return `This action updates a #${id} zenflowTeam`;
  }

  remove(id: number) {
    return `This action removes a #${id} zenflowTeam`;
  }
}
