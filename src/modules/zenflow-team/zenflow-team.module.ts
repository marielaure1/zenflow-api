import { Module } from '@nestjs/common';
import { ZenflowTeamService } from './zenflow-team.service';
import { ZenflowTeamController } from './zenflow-team.controller';

@Module({
  controllers: [ZenflowTeamController],
  providers: [ZenflowTeamService],
})
export class ZenflowTeamModule {}
