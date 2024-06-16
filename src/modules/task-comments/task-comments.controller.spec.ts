import { Test, TestingModule } from '@nestjs/testing';
import { TaskCommentsController } from '@modules/task-comments/task-comments.controller';
import { TaskCommentsService } from '@modules/task-comments/task-comments.service';

describe('TaskCommentsController', () => {
  let controller: TaskCommentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskCommentsController],
      providers: [TaskCommentsService],
    }).compile();

    controller = module.get<TaskCommentsController>(TaskCommentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
