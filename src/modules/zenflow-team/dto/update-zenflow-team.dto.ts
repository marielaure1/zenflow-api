import { PartialType } from '@nestjs/swagger';
import { CreateZenflowTeamDto } from './create-zenflow-team.dto';

export class UpdateZenflowTeamDto extends PartialType(CreateZenflowTeamDto) {}
