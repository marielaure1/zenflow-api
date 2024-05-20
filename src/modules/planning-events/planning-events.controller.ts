import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlanningEventsService } from './planning-events.service';
import { CreatePlanningEventDto } from './dto/create-planning-event.dto';
import { UpdatePlanningEventDto } from './dto/update-planning-event.dto';

@Controller('planning-events')
export class PlanningEventsController {
  constructor(private readonly planningEventsService: PlanningEventsService) {}

  @Post()
  create(@Body() createPlanningEventDto: CreatePlanningEventDto) {
    return this.planningEventsService.create(createPlanningEventDto);
  }

  @Get()
  findAll() {
    return this.planningEventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planningEventsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanningEventDto: UpdatePlanningEventDto) {
    return this.planningEventsService.update(+id, updatePlanningEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planningEventsService.remove(+id);
  }
}
