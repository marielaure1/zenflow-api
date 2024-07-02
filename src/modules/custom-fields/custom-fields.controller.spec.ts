import { Test, TestingModule } from '@nestjs/testing';
import { CustomFieldsController } from './custom-fields.controller';
import { CustomFieldsService } from './custom-fields.service';
import { CreateCustomFieldDto } from './dto/create-custom-field.dto';
import { UpdateCustomFieldDto } from './dto/update-custom-field.dto';
import { Response, Request } from 'express';
import { ValidationError } from 'class-validator';

describe('CustomFieldsController', () => {
  let controller: CustomFieldsController;
  let service: CustomFieldsService;

  const mockCustomField = {
    _id: '1',
    name: 'Custom Field 1',
    type: 'text',
    ownerId: 'ownerId1',
    schema: 'schema1',
  };

  const mockCustomFieldsService = {
    create: jest.fn().mockImplementation((dto: CreateCustomFieldDto) => Promise.resolve({ _id: '1', ...dto })),
    findAll: jest.fn().mockResolvedValue([mockCustomField]),
    findOne: jest.fn().mockImplementation((id: string) => Promise.resolve({ _id: id, ...mockCustomField })),
    update: jest.fn().mockImplementation((id: string, dto: UpdateCustomFieldDto) => Promise.resolve({ _id: id, ...dto })),
    remove: jest.fn().mockResolvedValue({ _id: '1', ...mockCustomField }),
    findWhere: jest.fn().mockResolvedValue([mockCustomField]),
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
      controllers: [CustomFieldsController],
      providers: [
        {
          provide: CustomFieldsService,
          useValue: mockCustomFieldsService,
        },
      ],
    }).compile();

    controller = module.get<CustomFieldsController>(CustomFieldsController);
    service = module.get<CustomFieldsService>(CustomFieldsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  /*
  * Create
  */
  it('Create [201] - should create a custom field', async () => {
    const dto: CreateCustomFieldDto = {
      name: 'Custom Field 1',
      type: 'text',
      ownerId: 'ownerId1',
      schema: 'schema1',
    };

    const res = mockResponse() as Response;

    await controller.create(dto, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      code: 201,
      datas: { 'custom-fields': { _id: '1', ...dto }},
      message: 'custom-fields create with success',
      success: true
    });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('Create [422] - should handle validation errors when creating a custom field', async () => {
    const dto: CreateCustomFieldDto = {
      name: 'Custom Field 1',
      type: 'text',
      ownerId: 'ownerId1',
      schema: 'schema1',
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
      datas: { 'custom-fields': [validationError] },
      message: 'Validation errors occurred',
      success: false
    });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('Create [500] - should handle internal server errors when creating a custom field', async () => {
    const dto: CreateCustomFieldDto = {
      name: 'Custom Field 1',
      type: 'text',
      ownerId: 'ownerId1',
      schema: 'schema1',
    };

    jest.spyOn(service, 'create').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;

    await controller.create(dto, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: { 'custom-fields': 'Internal server error' },
      message: 'An internal server error occurred',
      success: false
    });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  /*
  * FindAll
  */
  it('FindAll [200] - should return all custom fields', async () => {
    const res = mockResponse() as Response;

    await controller.findAll(res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      code: 200,
      datas: { 'custom-fields': [mockCustomField] },
      message: 'custom-fields retrieve with success',
      success: true
    });
    expect(service.findAll).toHaveBeenCalled();
  });

  it('FindAll [404] - should handle not found error when returning all custom fields', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValueOnce([]);

    const res = mockResponse() as Response;

    await controller.findAll(res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      code: 404,
      datas: { 'custom-fields': 'Not Found' },
      message: 'custom-fields not found',
      success: false
    });
    expect(service.findAll).toHaveBeenCalled();
  });

  it('FindAll [500] - should handle internal server errors when returning all custom fields', async () => {
    jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;

    await controller.findAll(res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: { 'custom-fields': 'Internal server error' },
      message: 'custom-fields internal server error',
      success: false
    });
    expect(service.findAll).toHaveBeenCalled();
  });

  /*
  * FindOne
  */
  it('FindOne [200] - should return a single custom field by id', async () => {
    const res = mockResponse() as Response;

    await controller.findOne('1', res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      code: 200,
      datas: { 'custom-fields': { _id: '1', ...mockCustomField }},
      message: 'custom-fields retrieve with success',
      success: true
    });
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('FindOne [404] - should handle not found error when returning a single custom field by id', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValueOnce(null);

    const res = mockResponse() as Response;

    await controller.findOne('1', res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      code: 404,
      datas: { 'custom-fields': 'Not Found' },
      message: 'custom-fields not found',
      success: false
    });
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('FindOne [500] - should handle internal server errors when returning a single custom field by id', async () => {
    jest.spyOn(service, 'findOne').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;

    await controller.findOne('1', res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: { 'custom-fields': 'Internal server error' },
      message: 'custom-fields internal server error',
      success: false
    });
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  /*
  * Update
  */
  it('Update [404] - should handle not found error when updating a custom field by id', async () => {
    const dto: UpdateCustomFieldDto = { name: 'Updated Custom Field' };

    jest.spyOn(service, 'update').mockResolvedValueOnce(null);

    const res = mockResponse() as Response;

    await controller.update('1', dto, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      code: 404,
      datas: { 'custom-fields': 'Not Found' },
      message: 'custom-fields not found',
      success: false
    });
    expect(service.update).toHaveBeenCalledWith('1', dto);
  });

  it('Update [500] - should handle internal server errors when updating a custom field by id', async () => {
    const dto: UpdateCustomFieldDto = { name: 'Updated Custom Field' };

    jest.spyOn(service, 'update').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;

    await controller.update('1', dto, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: { 'custom-fields': 'Internal server error' },
      message: 'custom-fields internal server error',
      success: false
    });
    expect(service.update).toHaveBeenCalledWith('1', dto);
  });

  it('Update [422] - should handle validation errors when updating a custom field by id', async () => {
    const dto: UpdateCustomFieldDto = { name: 'Updated Custom Field' };

    const validationError = new ValidationError();
    validationError.property = 'name';
    validationError.constraints = { isString: 'name must be a string' };

    jest.spyOn(service, 'update').mockRejectedValueOnce([validationError]);

    const res = mockResponse() as Response;

    await controller.update('1', dto, res);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      code: 422,
      datas: { 'custom-fields': [validationError] },
      message: 'Validation errors occurred',
      success: false
    });
    expect(service.update).toHaveBeenCalledWith('1', dto);
  });

  /*
  * Delete
  */
  it('Delete [200] - should delete a custom field by id', async () => {
    const res = mockResponse() as Response;

    await controller.remove('1', res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      code: 200,
      datas: { 'custom-fields': { removed: true }},
      message: 'custom-fields delete with success',
      success: true
    });
    expect(service.remove).toHaveBeenCalledWith('1');
  });

  it('Delete [404] - should handle not found error when deleting a custom field by id', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValueOnce(null);

    const res = mockResponse() as Response;

    await controller.remove('1', res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      code: 404,
      datas: { 'custom-fields': {} },
      message: 'custom-fields not found',
      success: false
    });
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('Delete [500] - should handle internal server errors when deleting a custom field by id', async () => {
    jest.spyOn(service, 'remove').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;

    await controller.remove('1', res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: { 'custom-fields': 'Internal server error' },
      message: 'custom-fields internal server error',
      success: false
    });
    expect(service.remove).toHaveBeenCalledWith('1');
  });

  /*
  * findAllOwnerCustomsFields
  */
  it('should return all custom fields for the current owner and schema', async () => {
    const res = mockResponse() as Response;
    const req = mockRequest('ownerId1') as Request;

    await controller.findAllOwnerCustomsFields(res, req, 'schema1');

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      code: 200,
      datas: { 'custom-fields': [mockCustomField] },
      message: 'custom-fields retrieve with success',
      success: true
    });
    expect(service.findWhere).toHaveBeenCalledWith({
      where: { ownerId: 'ownerId1', schema: 'schema1' },
      sort: 'position'
    });
  });

  it('should handle not found error when no custom fields are found', async () => {
    jest.spyOn(service, 'findWhere').mockResolvedValueOnce([]);

    const res = mockResponse() as Response;
    const req = mockRequest('ownerId1') as Request;

    await controller.findAllOwnerCustomsFields(res, req, 'schema1');

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      code: 404,
      datas: { 'custom-fields': {} },
      message: 'custom-fields not found',
      success: false
    });
    expect(service.findWhere).toHaveBeenCalledWith({
      where: { ownerId: 'ownerId1', schema: 'schema1' },
      sort: 'position'
    });
  });

  it('should handle internal server errors when retrieving custom fields for the current owner and schema', async () => {
    jest.spyOn(service, 'findWhere').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;
    const req = mockRequest('ownerId1') as Request;

    await controller.findAllOwnerCustomsFields(res, req, 'schema1');

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: { 'custom-fields': 'Internal server error' },
      message: 'custom-fields internal server error',
      success: false
    });
    expect(service.findWhere).toHaveBeenCalledWith({
      where: { ownerId: 'ownerId1', schema: 'schema1' },
      sort: 'position'
    });
  });

  /*
  * findOneOwnerCustomsFields
  */
  it('should return a specific custom field for the current owner and schema', async () => {
    const res = mockResponse() as Response;
    const req = mockRequest('ownerId1') as Request;

    await controller.findOneOwnerCustomsFields(res, req, '1', 'schema1');

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      code: 200,
      datas: { 'custom-fields': [mockCustomField] },
      message: 'custom-fields retrieve with success',
      success: true
    });
    expect(service.findWhere).toHaveBeenCalledWith({
      where: {
        ownerId: 'ownerId1',
        schema: 'schema1',
        $or: [{ schemaIds: ['1'] }]
      }
    });
  });

  it('should handle not found error when a specific custom field is not found', async () => {
    jest.spyOn(service, 'findWhere').mockResolvedValueOnce([]);

    const res = mockResponse() as Response;
    const req = mockRequest('ownerId1') as Request;

    await controller.findOneOwnerCustomsFields(res, req, '1', 'schema1');

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      code: 404,
      datas: { 'custom-fields': {} },
      message: 'custom-fields not found',
      success: false
    });
    expect(service.findWhere).toHaveBeenCalledWith({
      where: {
        ownerId: 'ownerId1',
        schema: 'schema1',
        $or: [{ schemaIds: ['1'] }]
      }
    });
  });

  it('should handle internal server errors when retrieving a specific custom field for the current owner and schema', async () => {
    jest.spyOn(service, 'findWhere').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;
    const req = mockRequest('ownerId1') as Request;

    await controller.findOneOwnerCustomsFields(res, req, '1', 'schema1');

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: { 'custom-fields': 'Internal server error' },
      message: 'custom-fields internal server error',
      success: false
    });
    expect(service.findWhere).toHaveBeenCalledWith({
      where: {
        ownerId: 'ownerId1',
        schema: 'schema1',
        $or: [{ schemaIds: ['1'] }]
      }
    });
  });

  /*
  * updatePositions
  */
  it('should update the positions of custom fields', async () => {
    const updateDtos: UpdateCustomFieldDto[] = [
      { _id: '1', position: 1 },
      { _id: '2', position: 2 }
    ];

    jest.spyOn(service, 'updatePositions').mockResolvedValueOnce(updateDtos);

    const res = mockResponse() as Response;
    const req = mockRequest('ownerId1') as Request;

    await controller.updatePositions(updateDtos, res, req, 'schema1');

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      code: 200,
      datas: { 'custom-fields': [mockCustomField] },
      message: 'custom-fields update positions with success',
      success: true
    });
    expect(service.updatePositions).toHaveBeenCalledWith(updateDtos);
    expect(service.findWhere).toHaveBeenCalledWith({
      where: {
        ownerId: 'ownerId1',
        schema: 'schema1'
      },
      sort: 'position'
    });
  });

  it('should handle internal server errors when updating positions of custom fields', async () => {
    const updateDtos: UpdateCustomFieldDto[] = [
      { _id: '1', position: 1 },
      { _id: '2', position: 2 }
    ];

    jest.spyOn(service, 'updatePositions').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;
    const req = mockRequest('ownerId1') as Request;

    await controller.updatePositions(updateDtos, res, req, 'schema1');

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: { 'custom-fields': 'Internal server error' },
      message: 'custom-fields internal server error',
      success: false
    });
    expect(service.updatePositions).toHaveBeenCalledWith(updateDtos);
  });
});
