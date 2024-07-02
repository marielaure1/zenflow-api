import { Test, TestingModule } from '@nestjs/testing';
import { ProspectsController } from './prospects.controller';
import { ProspectsService } from './prospects.service';
import { CreateProspectDto } from './dto/create-prospect.dto';
import { UpdateProspectDto } from './dto/update-prospect.dto';
import { Response, Request } from 'express';
import { ValidationError } from 'class-validator';

describe('ProspectsController', () => {
  let controller: ProspectsController;
  let service: ProspectsService;

  const mockProspect = {
    _id: '1',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    phone: '+1234567890',
    address: '123 Main St',
    status: 'potential',
    ownerId: 'ownerId1',
  };

  const mockProspectsService = {
    create: jest.fn().mockImplementation((dto: CreateProspectDto) => Promise.resolve({ _id: '1', ...dto })),
    findAll: jest.fn().mockResolvedValue([mockProspect]),
    findOne: jest.fn().mockImplementation((id: string) => Promise.resolve({ _id: id, ...mockProspect })),
    update: jest.fn().mockImplementation((id: string, dto: UpdateProspectDto) => Promise.resolve({ _id: id, ...dto })),
    remove: jest.fn().mockResolvedValue({ _id: '1', ...mockProspect }),
    findWhere: jest.fn().mockResolvedValue([mockProspect])
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
      controllers: [ProspectsController],
      providers: [
        {
          provide: ProspectsService,
          useValue: mockProspectsService,
        },
      ],
    }).compile();

    controller = module.get<ProspectsController>(ProspectsController);
    service = module.get<ProspectsService>(ProspectsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  /*
  * Create
  */
  it('Create [201] - should create a prospect', async () => {
    const dto: CreateProspectDto = {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      phone: '+1234567890',
      address: '123 Main St',
      status: 'potential',
      ownerId: 'ownerId1',
    };

    const res = mockResponse() as Response;

    await controller.create(dto, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      code: 201,
      datas: { prospects: { _id: '1', ...dto }},
      message: 'prospects create with success',
      success: true
    });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('Create [422] - should handle validation errors when creating a prospect', async () => {
    const dto: CreateProspectDto = {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      phone: '+1234567890',
      address: '123 Main St',
      status: 'potential',
      ownerId: 'ownerId1',
    };
  
    const validationError = new ValidationError();
    validationError.property = 'email';
    validationError.constraints = { isEmail: 'email must be an email' };
  
    jest.spyOn(service, 'create').mockRejectedValueOnce([validationError]);
  
    const res = mockResponse() as Response;
  
    await controller.create(dto, res);
  
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      code: 422,
      datas: { prospects: [validationError] },
      message: 'Validation errors occurred',
      success: false
    });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('Create [500] - should handle internal server errors when creating a prospect', async () => {
    const dto: CreateProspectDto = {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      phone: '+1234567890',
      address: '123 Main St',
      status: 'potential',
      ownerId: 'ownerId1',
    };

    jest.spyOn(service, 'create').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;

    await controller.create(dto, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: { prospects: 'Internal server error' },
      message: 'An internal server error occurred',
      success: false
    });
    expect(service.create).toHaveBeenCalledWith(dto);
  });
  
  /*
  * FindAll 
  */
  it('FindAll [200] - should return all prospects', async () => {
    const res = mockResponse() as Response;

    await controller.findAll(res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      code: 200,
      datas: { prospects: [mockProspect] },
      message: 'prospects retrieve with success',
      success: true
    });
    expect(service.findAll).toHaveBeenCalled();
  });

  it('FindAll [404] - should handle not found error when returning all prospects', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValueOnce([]);

    const res = mockResponse() as Response;

    await controller.findAll(res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      code: 404,
      datas: { prospects: 'Not Found' },
      message: 'prospects not found',
      success: false
    });
    expect(service.findAll).toHaveBeenCalled();
  });

  it('FindAll [500] - should handle internal server errors when returning all prospects', async () => {
    jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;

    await controller.findAll(res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: { prospects: 'Internal server error' },
      message: 'prospects internal server error',
      success: false
    });
    expect(service.findAll).toHaveBeenCalled();
  });

  /*
  * FindOne
  */
  it('FindOne [200] - should return a single prospect by id', async () => {
    const res = mockResponse() as Response;

    await controller.findOne('1', res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      code: 200,
      datas: { prospects: { _id: '1', ...mockProspect }},
      message: 'prospects retrieve with success',
      success: true
    });
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('FindOne [404] - should handle not found error when returning a single prospect by id', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValueOnce(null);

    const res = mockResponse() as Response;

    await controller.findOne('1', res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      code: 404,
      datas: { prospects: 'Not Found' },
      message: 'prospects not found',
      success: false
    });
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('FindOne [500] - should handle internal server errors when returning a single prospect by id', async () => {
    jest.spyOn(service, 'findOne').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;

    await controller.findOne('1', res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: { prospects: 'Internal server error' },
      message: 'prospects internal server error',
      success: false
    });
    expect(service.findOne).toHaveBeenCalledWith('1');
  });
  
  /*
  * Update 
  */
  it('Update [404] - should handle not found error when updating a prospect by id', async () => {
    const dto: UpdateProspectDto = { firstName: 'John' };

    jest.spyOn(service, 'update').mockResolvedValueOnce(null);

    const res = mockResponse() as Response;

    await controller.update('1', dto, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      code: 404,
      datas: { prospects: 'Not Found' },
      message: 'prospects not found',
      success: false
    });
    expect(service.update).toHaveBeenCalledWith('1', dto);
  });

  it('Update [500] - should handle internal server errors when updating a prospect by id', async () => {
    const dto: UpdateProspectDto = { firstName: 'John' };

    jest.spyOn(service, 'update').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;

    await controller.update('1', dto, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: { prospects: 'Internal server error' },
      message: 'prospects internal server error',
      success: false
    });
    expect(service.update).toHaveBeenCalledWith('1', dto);
  });

  it('Update [422] - should handle validation errors when updating a prospect by id', async () => {
    const dto: UpdateProspectDto = { firstName: 'John' };

    const validationError = new ValidationError();
    validationError.property = 'firstName';
    validationError.constraints = { isString: 'firstName must be a string' };

    jest.spyOn(service, 'update').mockRejectedValueOnce([validationError]);

    const res = mockResponse() as Response;

    await controller.update('1', dto, res);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      code: 422,
      datas: { prospects: [validationError] },
      message: 'Validation errors occurred',
      success: false
    });
    expect(service.update).toHaveBeenCalledWith('1', dto);
  });
  
  /*
  * Delete 
  */
  it('Delete [200] - should delete a prospect by id', async () => {
    const res = mockResponse() as Response;

    await controller.remove('1', res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      code: 200,
      datas: { prospects: { removed: true }},
      message: 'prospects delete with success',
      success: true
    });
    expect(service.remove).toHaveBeenCalledWith('1');
  });

  it('Delete [404] - should handle not found error when deleting a prospect by id', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValueOnce(null);

    const res = mockResponse() as Response;

    await controller.remove('1', res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      code: 404,
      datas: { prospects: {} },
      message: 'prospects not found',
      success: false
    });
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('Delete [500] - should handle internal server errors when deleting a prospect by id', async () => {
    jest.spyOn(service, 'remove').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;

    await controller.remove('1', res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: { prospects: 'Internal server error' },
      message: 'prospects internal server error',
      success: false
    });
    expect(service.remove).toHaveBeenCalledWith('1');
  });
  
  /*
  * FindAllOwner
  */
  it('should return all prospects for the current owner', async () => {
    const res = mockResponse() as Response;
    const req = mockRequest('ownerId1') as Request;

    await controller.findAllOwner(res, req);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      code: 200,
      datas: { prospects: [mockProspect] },
      message: 'prospects retrieve with success',
      success: true
    });
    expect(service.findWhere).toHaveBeenCalledWith({ where: { ownerId: 'ownerId1' } });
  });

  it('should handle not found error when no prospects are found', async () => {
    jest.spyOn(service, 'findWhere').mockResolvedValueOnce([]);

    const res = mockResponse() as Response;
    const req = mockRequest('ownerId1') as Request;

    await controller.findAllOwner(res, req);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      code: 404,
      datas: { prospects: {} },
      message: 'prospects not found',
      success: false
    });
    expect(service.findWhere).toHaveBeenCalledWith({ where: { ownerId: 'ownerId1' } });
  });

  it('should handle internal server errors when retrieving prospects for the current owner', async () => {
    jest.spyOn(service, 'findWhere').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;
    const req = mockRequest('ownerId1') as Request;

    await controller.findAllOwner(res, req);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: { prospects: 'Internal server error' },
      message: 'prospects internal server error',
      success: false
    });
    expect(service.findWhere).toHaveBeenCalledWith({ where: { ownerId: 'ownerId1' } });
  });
});
