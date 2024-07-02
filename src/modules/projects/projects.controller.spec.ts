import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { TaskCategoriesService } from '@modules/task-categories/task-categories.service';
import { TasksService } from '@modules/tasks/tasks.service';
import { CustomFieldsService } from '@modules/custom-fields/custom-fields.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Response, Request } from 'express';
import { ValidationError } from 'class-validator';

describe('ProjectsController', () => {
  let controller: ProjectsController;
  let service: ProjectsService;
  let taskCategoriesService: TaskCategoriesService;
  let tasksService: TasksService;

  const mockProject = {
    _id: '1',
    name: 'Project 1',
    ownerId: 'ownerId1',
  };

  const mockTaskCategory = {
    _id: '1',
    projectId: '1',
    name: 'Category 1',
  };

  const mockTask = {
    _id: '1',
    taskCategoryId: '1',
    name: 'Task 1',
  };

  const mockProjectsService = {
    create: jest.fn().mockImplementation((dto: CreateProjectDto) => Promise.resolve({ _id: '1', ...dto })),
    findAll: jest.fn().mockResolvedValue([mockProject]),
    findOne: jest.fn().mockImplementation((id: string) => Promise.resolve({ _id: id, ...mockProject })),
    update: jest.fn().mockImplementation((id: string, dto: UpdateProjectDto) => Promise.resolve({ _id: id, ...dto })),
    remove: jest.fn().mockResolvedValue({ _id: '1', ...mockProject }),
    findWhere: jest.fn().mockResolvedValue([mockProject]),
  };

  const mockTaskCategoriesService = {
    findWhere: jest.fn().mockResolvedValue([mockTaskCategory]),
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

  function mockRequest(customerId: string): Partial<Request> {
    return {
      customer: { _id: customerId },
    } as Partial<Request>;
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        {
          provide: ProjectsService,
          useValue: mockProjectsService,
        },
        {
          provide: TaskCategoriesService,
          useValue: mockTaskCategoriesService,
        },
        {
          provide: TasksService,
          useValue: mockTasksService,
        },
        CustomFieldsService,
      ],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
    service = module.get<ProjectsService>(ProjectsService);
    taskCategoriesService = module.get<TaskCategoriesService>(TaskCategoriesService);
    tasksService = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  /*
  * Create
  */
  it('Create [201] - should create a project', async () => {
    const dto: CreateProjectDto = {
      name: 'Project 1',
      description: "Description du projet",
      ownerId: 'ownerId1',
    };

    const res = mockResponse() as Response;

    await controller.create(dto, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      code: 201,
      datas: { projects: { _id: '1', ...dto }},
      message: 'projects create with success',
      success: true
    });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('Create [422] - should handle validation errors when creating a project', async () => {
    const dto: CreateProjectDto = {
      name: 'Project 1',
      description: "Description du projet",
      ownerId: 'ownerId1',
    };
  
    const validationError = new ValidationError();
    validationError.property = 'name';
    validationError.constraints = { isString: 'name must be a string' };
  
    jest.spyOn(service, 'create').mockRejectedValueOnce([validationError]);
  
    const res = mockResponse() as Response;
  
    await controller.create(dto, res);
  
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      code: 422,
      datas: { projects: [validationError] },
      message: 'Validation errors occurred',
      success: false
    });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('Create [500] - should handle internal server errors when creating a project', async () => {
    const dto: CreateProjectDto = {
      name: 'Project 1',
      description: "Description du projet",
      ownerId: 'ownerId1',
    };

    jest.spyOn(service, 'create').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;

    await controller.create(dto, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: { projects: 'Internal server error' },
      message: 'An internal server error occurred',
      success: false
    });
    expect(service.create).toHaveBeenCalledWith(dto);
  });
  
  /*
  * FindAll 
  */
  it('FindAll [200] - should return all projects', async () => {
    const res = mockResponse() as Response;

    await controller.findAll(res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      code: 200,
      datas: { projects: [mockProject] },
      message: 'projects retrieve with success',
      success: true
    });
    expect(service.findAll).toHaveBeenCalled();
  });

  it('FindAll [404] - should handle not found error when returning all projects', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValueOnce([]);

    const res = mockResponse() as Response;

    await controller.findAll(res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      code: 404,
      datas: { projects: 'Not Found' },
      message: 'projects not found',
      success: false
    });
    expect(service.findAll).toHaveBeenCalled();
  });

  it('FindAll [500] - should handle internal server errors when returning all projects', async () => {
    jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;

    await controller.findAll(res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: { projects: 'Internal server error' },
      message: 'projects internal server error',
      success: false
    });
    expect(service.findAll).toHaveBeenCalled();
  });

  /*
  * FindOne
  */
  it('FindOne [200] - should return a single project by id', async () => {
    const res = mockResponse() as Response;

    await controller.findOne('1', res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      code: 200,
      datas: { projects: { _id: '1', ...mockProject }},
      message: 'projects retrieve with success',
      success: true
    });
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('FindOne [404] - should handle not found error when returning a single project by id', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValueOnce(null);

    const res = mockResponse() as Response;

    await controller.findOne('1', res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      code: 404,
      datas: { projects: 'Not Found' },
      message: 'projects not found',
      success: false
    });
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('FindOne [500] - should handle internal server errors when returning a single project by id', async () => {
    jest.spyOn(service, 'findOne').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;

    await controller.findOne('1', res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: { projects: 'Internal server error' },
      message: 'projects internal server error',
      success: false
    });
    expect(service.findOne).toHaveBeenCalledWith('1');
  });
  
  /*
  * Update 
  */
  it('Update [404] - should handle not found error when updating a project by id', async () => {
    const dto: UpdateProjectDto = { name: 'Updated Project' };

    jest.spyOn(service, 'update').mockResolvedValueOnce(null);

    const res = mockResponse() as Response;

    await controller.update('1', dto, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      code: 404,
      datas: { projects: 'Not Found' },
      message: 'projects not found',
      success: false
    });
    expect(service.update).toHaveBeenCalledWith('1', dto);
  });

  it('Update [500] - should handle internal server errors when updating a project by id', async () => {
    const dto: UpdateProjectDto = { name: 'Updated Project' };

    jest.spyOn(service, 'update').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;

    await controller.update('1', dto, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: { projects: 'Internal server error' },
      message: 'projects internal server error',
      success: false
    });
    expect(service.update).toHaveBeenCalledWith('1', dto);
  });

  it('Update [422] - should handle validation errors when updating a project by id', async () => {
    const dto: UpdateProjectDto = { name: 'Updated Project' };

    const validationError = new ValidationError();
    validationError.property = 'name';
    validationError.constraints = { isString: 'name must be a string' };

    jest.spyOn(service, 'update').mockRejectedValueOnce([validationError]);

    const res = mockResponse() as Response;

    await controller.update('1', dto, res);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      code: 422,
      datas: { projects: [validationError] },
      message: 'Validation errors occurred',
      success: false
    });
    expect(service.update).toHaveBeenCalledWith('1', dto);
  });
  
  /*
  * Delete 
  */
  it('Delete [200] - should delete a project by id', async () => {
    const res = mockResponse() as Response;

    await controller.remove('1', res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      code: 200,
      datas: { projects: { removed: true }},
      message: 'projects delete with success',
      success: true
    });
    expect(service.remove).toHaveBeenCalledWith('1');
  });

  it('Delete [404] - should handle not found error when deleting a project by id', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValueOnce(null);

    const res = mockResponse() as Response;

    await controller.remove('1', res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      code: 404,
      datas: { projects: {} },
      message: 'projects not found',
      success: false
    });
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('Delete [500] - should handle internal server errors when deleting a project by id', async () => {
    jest.spyOn(service, 'remove').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;

    await controller.remove('1', res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: { projects: 'Internal server error' },
      message: 'projects internal server error',
      success: false
    });
    expect(service.remove).toHaveBeenCalledWith('1');
  });

  /*
  * findTasksCategories
  */
  it('findTasksCategories [200] - should return tasks categories for a project', async () => {
    const res = mockResponse() as Response;

    await controller.findTasksCategories('1', res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      code: 200,
      datas: {
        data: mockProject,
        taskCategories: [mockTaskCategory]
      },
      message: 'projects/tasks retrieve with success',
      success: true
    });
    expect(service.findOne).toHaveBeenCalledWith('1');
    expect(taskCategoriesService.findWhere).toHaveBeenCalledWith({ where: { projectId: '1' } });
  });

  it('findTasksCategories [404] - should handle not found error when returning tasks categories for a project', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValueOnce(null);

    const res = mockResponse() as Response;

    await controller.findTasksCategories('1', res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      code: 404,
      datas: { projects: 'Not Found' },
      message: 'projects/tasks not found',
      success: false
    });
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('findTasksCategories [500] - should handle internal server errors when returning tasks categories for a project', async () => {
    jest.spyOn(service, 'findOne').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;

    await controller.findTasksCategories('1', res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: { projects: 'Internal server error' },
      message: 'projects/tasks internal server error',
      success: false
    });
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  /*
  * findTasks
  */
  it('findTasks [200] - should return tasks for a project', async () => {
    const res = mockResponse() as Response;

    await controller.findTasks('1', res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      code: 200,
      datas: {
        data: mockProject,
        taskCategories: [mockTaskCategory],
        tasks: [mockTask]
      },
      message: 'projects/tasks retrieve with success',
      success: true
    });
    expect(service.findOne).toHaveBeenCalledWith('1');
    expect(taskCategoriesService.findWhere).toHaveBeenCalledWith({ where: { projectId: '1' } });
    expect(tasksService.findWhere).toHaveBeenCalledWith({ where: { taskCategoryId: '1' } });
  });

  it('findTasks [404] - should handle not found error when returning tasks for a project', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValueOnce(null);

    const res = mockResponse() as Response;

    await controller.findTasks('1', res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      code: 404,
      datas: { projects: 'Not Found' },
      message: 'projects/tasks not found',
      success: false
    });
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('findTasks [500] - should handle internal server errors when returning tasks for a project', async () => {
    jest.spyOn(service, 'findOne').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;

    await controller.findTasks('1', res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: { projects: 'Internal server error' },
      message: 'projects/tasks internal server error',
      success: false
    });
    expect(service.findOne).toHaveBeenCalledWith('1');
  });
  
  /*
  * FindAllOwner
  */
  it('should return all projects for the current owner', async () => {
    const res = mockResponse() as Response;
    const req = mockRequest('ownerId1') as Request;

    await controller.findAllOwner(res, req);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      code: 200,
      datas: { projects: [mockProject] },
      message: 'projects retrieve with success',
      success: true
    });
    expect(service.findWhere).toHaveBeenCalledWith({ where: { ownerId: 'ownerId1' } });
  });

  it('should handle not found error when no projects are found', async () => {
    jest.spyOn(service, 'findWhere').mockResolvedValueOnce([]);

    const res = mockResponse() as Response;
    const req = mockRequest('ownerId1') as Request;

    await controller.findAllOwner(res, req);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      code: 404,
      datas: { projects: {} },
      message: 'projects not found',
      success: false
    });
    expect(service.findWhere).toHaveBeenCalledWith({ where: { ownerId: 'ownerId1' } });
  });

  it('should handle internal server errors when retrieving projects for the current owner', async () => {
    jest.spyOn(service, 'findWhere').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;
    const req = mockRequest('ownerId1') as Request;

    await controller.findAllOwner(res, req);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: { projects: 'Internal server error' },
      message: 'projects internal server error',
      success: false
    });
    expect(service.findWhere).toHaveBeenCalledWith({ where: { ownerId: 'ownerId1' } });
  });
});
