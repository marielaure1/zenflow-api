import { Module } from '@nestjs/common';
import { PlanningEventsService } from './planning-events.service';
import { PlanningEventsController } from './planning-events.controller';

@Module({
  controllers: [PlanningEventsController],
  providers: [PlanningEventsService],
})
export class PlanningEventsModule {}
