import { Test, TestingModule } from '@nestjs/testing';
import { NotesController } from './note-folders.controller';
import { NotesService } from './note-folders.service';
import { CreateNoteFolderDto } from './dto/create-note-folder.dto';
import { UpdateNoteFolderDto } from './dto/update-note-folder.dto';
import { Response, Request} from 'express';
import { ValidationError } from 'class-validator';

describe('NotesController', () => {
  let controller: NotesController;
  let service: NotesService;

  const mockNote = {
    _id: '1',
    title: 'Note 1',
    content: 'Content 1',
  };

  const mockNotesService = {
    create: jest.fn().mockImplementation((dto: CreateNoteDto) => Promise.resolve({ _id: '1', ...dto })),
    findAll: jest.fn().mockResolvedValue([mockNote]),
    findOne: jest.fn().mockImplementation((id: string) => Promise.resolve({ _id: id, ...mockNote })),
    update: jest.fn().mockImplementation((id: string, dto: UpdateNoteDto) => Promise.resolve({ _id: id, ...dto })),
    remove: jest.fn().mockResolvedValue({ _id: '1', ...mockNote }),
    findWhere: jest.fn().mockResolvedValue([mockNote]),
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
      controllers: [NotesController],
      providers: [
        {
          provide: NotesService,
          useValue: mockNotesService,
        },
      ],
    }).compile();

    controller = module.get<NotesController>(NotesController);
    service = module.get<NotesService>(NotesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  /*
  * Create
  */
  it('Create [201] - should create a note', async () => {
    const dto: CreateNoteDto = {
      title: 'Note 1',
      content: 'Content 1',
    };

    const res = mockResponse() as Response;

    await controller.create(dto, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      code: 201,
      datas: { notes: { _id: '1', ...dto }},
      message: 'notes create with success',
      success: true
    });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('Create [422] - should handle validation errors when creating a note', async () => {
    const dto: CreateNoteDto = {
      title: 'Note 1',
      content: 'Content 1',
    };
  
    const validationError = new ValidationError();
    validationError.property = 'title';
    validationError.constraints = { isNotEmpty: 'title should not be empty' };
  
    jest.spyOn(service, 'create').mockRejectedValueOnce([validationError]);
  
    const res = mockResponse() as Response;
  
    await controller.create(dto, res);
  
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      code: 422,
      datas: { notes: [validationError] },
      message: 'Validation errors occurred',
      success: false
    });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('Create [500] - should handle internal server errors when creating a note', async () => {
    const dto: CreateNoteDto = {
      title: 'Note 1',
      content: 'Content 1',
    };

    jest.spyOn(service, 'create').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;

    await controller.create(dto, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: { notes: 'Internal server error' },
      message: 'An internal server error occurred',
      success: false
    });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  /*
  * FindAll 
  */
  it('FindAll [200] - should return all notes', async () => {
    const res = mockResponse() as Response;

    await controller.findAll(res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      code: 200,
      datas: { notes: [mockNote] },
      message: 'notes retrieve with success',
      success: true
    });
    expect(service.findAll).toHaveBeenCalled();
  });

  it('FindAll [404] - should handle not found error when returning all notes', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValueOnce([]);

    const res = mockResponse() as Response;

    await controller.findAll(res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      code: 404,
      datas: { notes: 'Not Found' },
      message: 'notes not found',
      success: false
    });
    expect(service.findAll).toHaveBeenCalled();
  });

  it('FindAll [500] - should handle internal server errors when returning all notes', async () => {
    jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;

    await controller.findAll(res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: { notes: 'Internal server error' },
      message: 'notes internal server error',
      success: false
    });
    expect(service.findAll).toHaveBeenCalled();
  });

  /*
  * FindOne
  */
  it('FindOne [200] - should return a single note by id', async () => {
    const res = mockResponse() as Response;

    await controller.findOne('1', res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      code: 200,
      datas: { notes: { _id: '1', ...mockNote }},
      message: 'notes retrieve with success',
      success: true
    });
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('FindOne [404] - should handle not found error when returning a single note by id', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValueOnce(null);

    const res = mockResponse() as Response;

    await controller.findOne('1', res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      code: 404,
      datas: { notes: 'Not Found' },
      message: 'notes not found',
      success: false
    });
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('FindOne [500] - should handle internal server errors when returning a single note by id', async () => {
    jest.spyOn(service, 'findOne').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;

    await controller.findOne('1', res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: { notes: 'Internal server error' },
      message: 'notes internal server error',
      success: false
    });
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  /*
  * Update 
  */
  it('Update [404] - should handle not found error when updating a note by id', async () => {
    const dto: UpdateNoteDto = { title: 'Updated Note', content: 'Updated Content' };

    jest.spyOn(service, 'update').mockResolvedValueOnce(null);

    const res = mockResponse() as Response;

    await controller.update('1', dto, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      code: 404,
      datas: { notes: 'Not Found' },
      message: 'notes not found',
      success: false
    });
    expect(service.update).toHaveBeenCalledWith('1', dto);
  });

  it('Update [500] - should handle internal server errors when updating a note by id', async () => {
    const dto: UpdateNoteDto = { title: 'Updated Note', content: 'Updated Content' };

    jest.spyOn(service, 'update').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;

    await controller.update('1', dto, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: { notes: 'Internal server error' },
      message: 'notes internal server error',
      success: false
    });
    expect(service.update).toHaveBeenCalledWith('1', dto);
  });

  it('Update [422] - should handle validation errors when updating a note by id', async () => {
    const dto: UpdateNoteDto = { title: 'Updated Note', content: 'Updated Content' };

    const validationError = new ValidationError();
    validationError.property = 'title';
    validationError.constraints = { isNotEmpty: 'title should not be empty' };

    jest.spyOn(service, 'update').mockRejectedValueOnce([validationError]);

    const res = mockResponse() as Response;

    await controller.update('1', dto, res);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      code: 422,
      datas: { notes: [validationError] },
      message: 'Validation errors occurred',
      success: false
    });
    expect(service.update).toHaveBeenCalledWith('1', dto);
  });

  /*
  * Delete 
  */
  it('Delete [200] - should delete a note by id', async () => {
    const res = mockResponse() as Response;

    await controller.remove('1', res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      code: 200,
      datas: { notes: { removed: true }},
      message: 'notes delete with success',
      success: true
    });
    expect(service.remove).toHaveBeenCalledWith('1');
  });

  it('Delete [404] - should handle not found error when deleting a note by id', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValueOnce(null);

    const res = mockResponse() as Response;

    await controller.remove('1', res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      code: 404,
      datas: { notes: {} },
      message: 'notes not found',
      success: false
    });
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('Delete [500] - should handle internal server errors when deleting a note by id', async () => {
    jest.spyOn(service, 'remove').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;

    await controller.remove('1', res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: { notes: 'Internal server error' },
      message: 'notes internal server error',
      success: false
    });
    expect(service.remove).toHaveBeenCalledWith('1');
  });

  /*
  * FindAllOwner
  */
  it('FindAllOwner [200] - should return all notes for the current owner', async () => {
    const res = mockResponse() as Response;
    const req = mockRequest('ownerId1') as Request;

    await controller.findAllOwner(res, req);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      code: 200,
      datas: { notes: [mockNote] },
      message: 'notes retrieve with success',
      success: true
    });
    expect(service.findWhere).toHaveBeenCalledWith({ where: { ownerId: 'ownerId1' } });
  });

  it('FindAllOwner [404] - should handle not found error when no notes are found for the current owner', async () => {
    jest.spyOn(service, 'findWhere').mockResolvedValueOnce([]);

    const res = mockResponse() as Response;
    const req = mockRequest('ownerId1') as Request;

    await controller.findAllOwner(res, req);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      code: 404,
      datas: { notes: 'Not Found' },
      message: 'notes not found',
      success: false
    });
    expect(service.findWhere).toHaveBeenCalledWith({ where: { ownerId: 'ownerId1' } });
  });

  it('FindAllOwner [500] - should handle internal server errors when retrieving notes for the current owner', async () => {
    jest.spyOn(service, 'findWhere').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;
    const req = mockRequest('ownerId1') as Request;

    await controller.findAllOwner(res, req);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: { notes: 'Internal server error' },
      message: 'notes internal server error',
      success: false
    });
    expect(service.findWhere).toHaveBeenCalledWith({ where: { ownerId: 'ownerId1' } });
  });
});
