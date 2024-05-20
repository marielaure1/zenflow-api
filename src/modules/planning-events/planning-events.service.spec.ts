import { Test, TestingModule } from '@nestjs/testing';
import { PlanningEventsService } from './planning-events.service';

describe('PlanningEventsService', () => {
  let service: PlanningEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanningEventsService],
    }).compile();

    service = module.get<PlanningEventsService>(PlanningEventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
