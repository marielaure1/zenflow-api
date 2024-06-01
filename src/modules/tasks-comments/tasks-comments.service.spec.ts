import { Test, TestingModule } from '@nestjs/testing';
import { TasksCommentsService } from './tasks-comments.service';

describe('TasksCommentsService', () => {
  let service: TasksCommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksCommentsService],
    }).compile();

    service = module.get<TasksCommentsService>(TasksCommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
