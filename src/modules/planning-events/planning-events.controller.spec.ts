import { Test, TestingModule } from '@nestjs/testing';
import { PlanningEventsController } from './planning-events.controller';
import { PlanningEventsService } from './planning-events.service';

describe('PlanningEventsController', () => {
  let controller: PlanningEventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanningEventsController],
      providers: [PlanningEventsService],
    }).compile();

    controller = module.get<PlanningEventsController>(PlanningEventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
