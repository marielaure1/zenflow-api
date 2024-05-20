import { Injectable } from '@nestjs/common';
import { CreatePlanningEventDto } from './dto/create-planning-event.dto';
import { UpdatePlanningEventDto } from './dto/update-planning-event.dto';

@Injectable()
export class PlanningEventsService {
  create(createPlanningEventDto: CreatePlanningEventDto) {
    return 'This action adds a new planningEvent';
  }

  findAll() {
    return `This action returns all planningEvents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} planningEvent`;
  }

  update(id: number, updatePlanningEventDto: UpdatePlanningEventDto) {
    return `This action updates a #${id} planningEvent`;
  }

  remove(id: number) {
    return `This action removes a #${id} planningEvent`;
  }
}
