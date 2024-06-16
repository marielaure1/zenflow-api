import { Test, TestingModule } from '@nestjs/testing';
import { TaskCategoriesController } from '@modules/task-categories/task-categories.controller';
import { TaskCategoriesService } from '@modules/task-categories/task-categories.service';

describe('TasksCategoriesController', () => {
  let controller: TaskCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskCategoriesController],
      providers: [TaskCategoriesService],
    }).compile();

    controller = module.get<TaskCategoriesController>(TaskCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
