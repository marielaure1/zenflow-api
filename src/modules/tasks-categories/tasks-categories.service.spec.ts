import { Test, TestingModule } from '@nestjs/testing';
import { TasksCategoriesService } from './tasks-categories.service';

describe('TasksCategoriesService', () => {
  let service: TasksCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksCategoriesService],
    }).compile();

    service = module.get<TasksCategoriesService>(TasksCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
