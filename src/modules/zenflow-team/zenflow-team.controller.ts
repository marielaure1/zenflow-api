import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ZenflowTeamService } from './zenflow-team.service';
import { CreateZenflowTeamDto } from './dto/create-zenflow-team.dto';
import { UpdateZenflowTeamDto } from './dto/update-zenflow-team.dto';

@Controller('zenflow-team')
export class ZenflowTeamController {
  constructor(private readonly zenflowTeamService: ZenflowTeamService) {}

  @Post()
  create(@Body() createZenflowTeamDto: CreateZenflowTeamDto) {
    return this.zenflowTeamService.create(createZenflowTeamDto);
  }

  @Get()
  findAll() {
    return this.zenflowTeamService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zenflowTeamService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateZenflowTeamDto: UpdateZenflowTeamDto) {
    return this.zenflowTeamService.update(+id, updateZenflowTeamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zenflowTeamService.remove(+id);
  }
}
