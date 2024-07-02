import { Test, TestingModule } from '@nestjs/testing';
import { PlansController } from './plans.controller';
import { PlansService } from './plans.service';
import { PlansStripeService } from '@providers/services/stripe/services/plans.stripe.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { Response } from 'express';
import { ValidationError } from 'class-validator';
import { PlanInterval } from './enum/plan-interval.enum';

describe('PlansController', () => {
  let controller: PlansController;
  let plansService: PlansService;
  let plansStripeService: PlansStripeService;

  const mockPlan = {
    _id: '1',
    name: 'Plan 1',
    description: 'Description 1',
    amount: 1000,
    currency: 'usd',
    interval: 'month',
    features: ['Feature 1', 'Feature 2'],
    stripePlanId: 'stripe_1',
  };

  const mockPlansService = {
    create: jest.fn().mockImplementation((dto: CreatePlanDto) => Promise.resolve({ _id: '1', ...dto })),
    findAll: jest.fn().mockResolvedValue([mockPlan]),
    findOne: jest.fn().mockImplementation((id: string) => Promise.resolve({ _id: id, ...mockPlan })),
    update: jest.fn().mockImplementation((id: string, dto: UpdatePlanDto) => Promise.resolve({ _id: id, ...dto })),
    remove: jest.fn().mockResolvedValue({ _id: '1', ...mockPlan }),
  };

  const mockPlansStripeService = {
    create: jest.fn().mockImplementation((dto: CreatePlanDto) => Promise.resolve({ id: 'stripe_1', ...dto })),
    update: jest.fn().mockImplementation((id: string, dto: UpdatePlanDto) => Promise.resolve({ id: 'stripe_1', ...dto })),
    delete: jest.fn().mockResolvedValue({ id: 'stripe_1' }),
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
      controllers: [PlansController],
      providers: [
        {
          provide: PlansService,
          useValue: mockPlansService,
        },
        {
          provide: PlansStripeService,
          useValue: mockPlansStripeService,
        },
      ],
    }).compile();

    controller = module.get<PlansController>(PlansController);
    plansService = module.get<PlansService>(PlansService);
    plansStripeService = module.get<PlansStripeService>(PlansStripeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  /*
  * Create
  */
  it('Create [201] - should create a plan', async () => {
    const dto: CreatePlanDto = {
      name: 'Plan 1',
      description: 'Description 1',
      amount: 1000,
      currency: 'usd',
      interval: PlanInterval.MONTHLY,
      features: ['Feature 1', 'Feature 2'],
    };

    const res = mockResponse() as Response;

    await controller.create(dto, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      code: 201,
      datas: { plans: { _id: '1', ...dto }},
      message: 'plans create with success',
      success: true
    });
    expect(plansService.create).toHaveBeenCalledWith({ stripePlanId: 'stripe_1', ...dto });
    expect(plansStripeService.create).toHaveBeenCalledWith(dto);
  });

  it('Create [422] - should handle validation errors when creating a plan', async () => {
    const dto: CreatePlanDto = {
      name: 'Plan 1',
      description: 'Description 1',
      amount: 1000,
      currency: 'usd',
      interval: PlanInterval.MONTHLY,
      features: ['Feature 1', 'Feature 2'],
    };
  
    const validationError = new ValidationError();
    validationError.property = 'name';
    validationError.constraints = { isNotEmpty: 'name should not be empty' };
  
    jest.spyOn(plansService, 'create').mockRejectedValueOnce([validationError]);
  
    const res = mockResponse() as Response;
  
    await controller.create(dto, res);
  
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      code: 422,
      datas: { plans: [validationError] },
      message: 'Validation errors occurred',
      success: false
    });
    expect(plansService.create).toHaveBeenCalledWith({ stripePlanId: 'stripe_1', ...dto });
  });

  it('Create [500] - should handle internal server errors when creating a plan', async () => {
    const dto: CreatePlanDto = {
      name: 'Plan 1',
      description: 'Description 1',
      amount: 1000,
      currency: 'usd',
      interval: PlanInterval.MONTHLY,
      features: ['Feature 1', 'Feature 2'],
    };

    jest.spyOn(plansService, 'create').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;

    await controller.create(dto, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: { plans: 'Internal server error' },
      message: 'An internal server error occurred',
      success: false
    });
    expect(plansService.create).toHaveBeenCalledWith({ stripePlanId: 'stripe_1', ...dto });
  });

  /*
  * FindAll 
  */
  it('FindAll [200] - should return all plans', async () => {
    const res = mockResponse() as Response;

    await controller.findAll(res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      code: 200,
      datas: { plans: [mockPlan] },
      message: 'plans retrieve with success',
      success: true
    });
    expect(plansService.findAll).toHaveBeenCalled();
  });

  it('FindAll [404] - should handle not found error when returning all plans', async () => {
    jest.spyOn(plansService, 'findAll').mockResolvedValueOnce([]);

    const res = mockResponse() as Response;

    await controller.findAll(res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      code: 404,
      datas: { plans: 'Not Found' },
      message: 'plans not found',
      success: false
    });
    expect(plansService.findAll).toHaveBeenCalled();
  });

  it('FindAll [500] - should handle internal server errors when returning all plans', async () => {
    jest.spyOn(plansService, 'findAll').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;

    await controller.findAll(res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: { plans: 'Internal server error' },
      message: 'plans internal server error',
      success: false
    });
    expect(plansService.findAll).toHaveBeenCalled();
  });

  /*
  * FindOne
  */
  it('FindOne [200] - should return a single plan by id', async () => {
    const res = mockResponse() as Response;

    await controller.findOne('1', res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      code: 200,
      datas: { plans: { _id: '1', ...mockPlan }},
      message: 'plans retrieve with success',
      success: true
    });
    expect(plansService.findOne).toHaveBeenCalledWith('1');
  });

  it('FindOne [404] - should handle not found error when returning a single plan by id', async () => {
    jest.spyOn(plansService, 'findOne').mockResolvedValueOnce(null);

    const res = mockResponse() as Response;

    await controller.findOne('1', res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      code: 404,
      datas: { plans: 'Not Found' },
      message: 'plans not found',
      success: false
    });
    expect(plansService.findOne).toHaveBeenCalledWith('1');
  });

  it('FindOne [500] - should handle internal server errors when returning a single plan by id', async () => {
    jest.spyOn(plansService, 'findOne').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;

    await controller.findOne('1', res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: { plans: 'Internal server error' },
      message: 'plans internal server error',
      success: false
    });
    expect(plansService.findOne).toHaveBeenCalledWith('1');
  });

  /*
  * Update 
  */
  it('Update [404] - should handle not found error when updating a plan by id', async () => {
    const dto: UpdatePlanDto = { name: 'Updated Plan', description: 'Updated Description', amount: 1500, currency: 'usd', interval: PlanInterval.YEARLY, features: ['Feature 1', 'Feature 3'] };

    jest.spyOn(plansService, 'findOne').mockResolvedValueOnce(null);

    const res = mockResponse() as Response;

    await controller.update('1', dto, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      code: 404,
      datas: { plans: 'Not Found' },
      message: 'plans not found',
      success: false
    });
    expect(plansService.findOne).toHaveBeenCalledWith('1');
  });

  it('Update [500] - should handle internal server errors when updating a plan by id', async () => {
    const dto: UpdatePlanDto = { name: 'Updated Plan', description: 'Updated Description', amount: 1500, currency: 'usd', interval: PlanInterval.YEARLY, features: ['Feature 1', 'Feature 3'] };

    jest.spyOn(plansService, 'update').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;

    await controller.update('1', dto, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: { plans: 'Internal server error' },
      message: 'plans internal server error',
      success: false
    });
    expect(plansService.update).toHaveBeenCalledWith('1', { stripePlanId: 'stripe_1', ...dto });
  });

  it('Update [422] - should handle validation errors when updating a plan by id', async () => {
    const dto: UpdatePlanDto = { name: 'Updated Plan', description: 'Updated Description', amount: 1500, currency: 'usd', interval: PlanInterval.YEARLY, features: ['Feature 1', 'Feature 3'] };

    const validationError = new ValidationError();
    validationError.property = 'name';
    validationError.constraints = { isNotEmpty: 'name should not be empty' };

    jest.spyOn(plansService, 'update').mockRejectedValueOnce([validationError]);

    const res = mockResponse() as Response;

    await controller.update('1', dto, res);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      code: 422,
      datas: { plans: [validationError] },
      message: 'Validation errors occurred',
      success: false
    });
    expect(plansService.update).toHaveBeenCalledWith('1', { stripePlanId: 'stripe_1', ...dto });
  });

  /*
  * Delete 
  */
  it('Delete [200] - should delete a plan by id', async () => {
    const res = mockResponse() as Response;

    await controller.delete('1', res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      code: 200,
      datas: { plans: { removed: true }},
      message: 'plans delete with success',
      success: true
    });
    expect(plansService.remove).toHaveBeenCalledWith('1');
  });

  it('Delete [404] - should handle not found error when deleting a plan by id', async () => {
    jest.spyOn(plansService, 'findOne').mockResolvedValueOnce(null);

    const res = mockResponse() as Response;

    await controller.delete('1', res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      code: 404,
      datas: { plans: {} },
      message: 'plans not found',
      success: false
    });
    expect(plansService.findOne).toHaveBeenCalledWith('1');
  });

  it('Delete [500] - should handle internal server errors when deleting a plan by id', async () => {
    jest.spyOn(plansService, 'remove').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;

    await controller.delete('1', res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: { plans: 'Internal server error' },
      message: 'plans internal server error',
      success: false
    });
    expect(plansService.remove).toHaveBeenCalledWith('1');
  });
});
