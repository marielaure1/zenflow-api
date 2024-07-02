import { Test, TestingModule } from '@nestjs/testing';
import { TaskCategoriesController } from './task-categories.controller';
import { TaskCategoriesService } from './task-categories.service';
import { TasksService } from '@modules/tasks/tasks.service';
import { CreateTaskCategorieDto } from './dto/create-task-categorie.dto';
import { UpdateTaskCategorieDto } from './dto/update-task-categorie.dto';
import { Response } from 'express';
import { ValidationError } from 'class-validator';

describe('TaskCategoriesController', () => {
  let controller: TaskCategoriesController;
  let service: TaskCategoriesService;
  let tasksService: TasksService;

  const mockTaskCategory = {
    _id: '1',
    name: 'Category 1',
    description: 'Description 1',
  };

  const mockTask = {
    _id: '1',
    name: 'Task 1',
    description: 'Task Description 1',
    taskCategoryId: '1',
  };

  const mockTaskCategoriesService = {
    create: jest.fn().mockImplementation((dto: CreateTaskCategorieDto) => Promise.resolve({ _id: '1', ...dto })),
    findAll: jest.fn().mockResolvedValue([mockTaskCategory]),
    findOne: jest.fn().mockImplementation((id: string) => Promise.resolve({ _id: id, ...mockTaskCategory })),
    update: jest.fn().mockImplementation((id: string, dto: UpdateTaskCategorieDto) => Promise.resolve({ _id: id, ...dto })),
    remove: jest.fn().mockResolvedValue({ _id: '1', ...mockTaskCategory }),
  };

  const mockTasksService = {
    findWhere: jest.fn().mockResolvedValue([mockTask]),
  };

  function mockResponse(): Partial<Response> {
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    return res;
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskCategoriesController],
      providers: [
        {
          provide: TaskCategoriesService,
          useValue: mockTaskCategoriesService,
        },
        {
          provide: TasksService,
          useValue: mockTasksService,
        },
      ],
    }).compile();

    controller = module.get<TaskCategoriesController>(TaskCategoriesController);
    service = module.get<TaskCategoriesService>(TaskCategoriesService);
    tasksService = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  /*
  * Create
  */
  it('Create [201] - should create a task category', async () => {
    const dto: CreateTaskCategorieDto = {
      name: 'Category 1',
      description: 'Description 1',
    };

    const res = mockResponse() as Response;

    await controller.create(dto, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      code: 201,
      datas: { tasksCategories: { _id: '1', ...dto }},
      message: 'tasksCategories create with success',
      success: true
    });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('Create [422] - should handle validation errors when creating a task category', async () => {
    const dto: CreateTaskCategorieDto = {
      name: 'Category 1',
      description: 'Description 1',
    };
  
    const validationError = new ValidationError();
    validationError.property = 'name';
    validationError.constraints = { isNotEmpty: 'name should not be empty' };
  
    jest.spyOn(service, 'create').mockRejectedValueOnce([validationError]);
  
    const res = mockResponse() as Response;
  
    await controller.create(dto, res);
  
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      code: 422,
      datas: { tasksCategories: [validationError] },
      message: 'Validation errors occurred',
      success: false
    });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('Create [500] - should handle internal server errors when creating a task category', async () => {
    const dto: CreateTaskCategorieDto = {
      name: 'Category 1',
      description: 'Description 1',
    };

    jest.spyOn(service, 'create').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;

    await controller.create(dto, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: { tasksCategories: 'Internal server error' },
      message: 'An internal server error occurred',
      success: false
    });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  /*
  * FindAll 
  */
  it('FindAll [200] - should return all task categories', async () => {
    const res = mockResponse() as Response;

    await controller.findAll(res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      code: 200,
      datas: { tasksCategories: [mockTaskCategory] },
      message: 'tasksCategories retrieve with success',
      success: true
    });
    expect(service.findAll).toHaveBeenCalled();
  });

  it('FindAll [404] - should handle not found error when returning all task categories', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValueOnce([]);

    const res = mockResponse() as Response;

    await controller.findAll(res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      code: 404,
      datas: { tasksCategories: 'Not Found' },
      message: 'tasksCategories not found',
      success: false
    });
    expect(service.findAll).toHaveBeenCalled();
  });

  it('FindAll [500] - should handle internal server errors when returning all task categories', async () => {
    jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;

    await controller.findAll(res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: { tasksCategories: 'Internal server error' },
      message: 'tasksCategories internal server error',
      success: false
    });
    expect(service.findAll).toHaveBeenCalled();
  });

  /*
  * FindOne
  */
  it('FindOne [200] - should return a single task category by id', async () => {
    const res = mockResponse() as Response;

    await controller.findOne('1', res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      code: 200,
      datas: { tasksCategories: { _id: '1', ...mockTaskCategory }},
      message: 'tasksCategories retrieve with success',
      success: true
    });
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('FindOne [404] - should handle not found error when returning a single task category by id', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValueOnce(null);

    const res = mockResponse() as Response;

    await controller.findOne('1', res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      code: 404,
      datas: { tasksCategories: 'Not Found' },
      message: 'tasksCategories not found',
      success: false
    });
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('FindOne [500] - should handle internal server errors when returning a single task category by id', async () => {
    jest.spyOn(service, 'findOne').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;

    await controller.findOne('1', res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: { tasksCategories: 'Internal server error' },
      message: 'tasksCategories internal server error',
      success: false
    });
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  /*
  * Update 
  */
  it('Update [404] - should handle not found error when updating a task category by id', async () => {
    const dto: UpdateTaskCategorieDto = { name: 'Updated Category' };

    jest.spyOn(service, 'update').mockResolvedValueOnce(null);

    const res = mockResponse() as Response;

    await controller.update('1', dto, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      code: 404,
      datas: { tasksCategories: 'Not Found' },
      message: 'tasksCategories not found',
      success: false
    });
    expect(service.update).toHaveBeenCalledWith('1', dto);
  });

  it('Update [500] - should handle internal server errors when updating a task category by id', async () => {
    const dto: UpdateTaskCategorieDto = { name: 'Updated Category' };

    jest.spyOn(service, 'update').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;

    await controller.update('1', dto, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: { tasksCategories: 'Internal server error' },
      message: 'tasksCategories internal server error',
      success: false
    });
    expect(service.update).toHaveBeenCalledWith('1', dto);
  });

  it('Update [422] - should handle validation errors when updating a task category by id', async () => {
    const dto: UpdateTaskCategorieDto = { name: 'Updated Category' };

    const validationError = new ValidationError();
    validationError.property = 'name';
    validationError.constraints = { isNotEmpty: 'name should not be empty' };

    jest.spyOn(service, 'update').mockRejectedValueOnce([validationError]);

    const res = mockResponse() as Response;

    await controller.update('1', dto, res);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      code: 422,
      datas: { tasksCategories: [validationError] },
      message: 'Validation errors occurred',
      success: false
    });
    expect(service.update).toHaveBeenCalledWith('1', dto);
  });

  /*
  * Delete 
  */
  it('Delete [200] - should delete a task category by id', async () => {
    const res = mockResponse() as Response;

    await controller.remove('1', res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      code: 200,
      datas: { tasksCategories: { removed: true }},
      message: 'tasksCategories delete with success',
      success: true
    });
    expect(service.remove).toHaveBeenCalledWith('1');
  });

  it('Delete [404] - should handle not found error when deleting a task category by id', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValueOnce(null);

    const res = mockResponse() as Response;

    await controller.remove('1', res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      code: 404,
      datas: { tasksCategories: {} },
      message: 'tasksCategories not found',
      success: false
    });
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('Delete [500] - should handle internal server errors when deleting a task category by id', async () => {
    jest.spyOn(service, 'remove').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;

    await controller.remove('1', res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: { tasksCategories: 'Internal server error' },
      message: 'tasksCategories internal server error',
      success: false
    });
    expect(service.remove).toHaveBeenCalledWith('1');
  });

  /*
  * FindTasks
  */
  it('FindTasks [200] - should return all tasks for the specific task category', async () => {
    const res = mockResponse() as Response;

    await controller.findTasks('1', res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      code: 200,
      datas: {
        data: mockTaskCategory,
        tasks: [mockTask]
      },
      message: 'tasks retrieve with success',
      success: true
    });
    expect(service.findOne).toHaveBeenCalledWith('1');
    expect(tasksService.findWhere).toHaveBeenCalledWith({ where: { taskCategoryId: '1' } });
  });

  it('FindTasks [404] - should handle not found error when no tasks found for the specific task category', async () => {
    jest.spyOn(tasksService, 'findWhere').mockResolvedValueOnce([]);

    const res = mockResponse() as Response;

    await controller.findTasks('1', res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      code: 404,
      datas: 'Not Found',
      message: 'tasks not found',
      success: false
    });
    expect(tasksService.findWhere).toHaveBeenCalledWith({ where: { taskCategoryId: '1' } });
  });

  it('FindTasks [500] - should handle internal server errors when retrieving tasks for the specific task category', async () => {
    jest.spyOn(tasksService, 'findWhere').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;

    await controller.findTasks('1', res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: 'Internal server error',
      message: 'tasks internal server error',
      success: false
    });
    expect(tasksService.findWhere).toHaveBeenCalledWith({ where: { taskCategoryId: '1' } });
  });
});
