import { PartialType } from '@nestjs/swagger';
import { CreatePlanningEventDto } from './create-planning-event.dto';

export class UpdatePlanningEventDto extends PartialType(CreatePlanningEventDto) {}
