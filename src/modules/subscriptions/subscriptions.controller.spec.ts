import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import { CustomersStripeService } from '@providers/services/stripe/services/customers.stripe.service';
import { SubscriptionsStripeService } from '@providers/services/stripe/services/subscriptions.stripe.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { Response } from 'express';
import { ValidationError } from 'class-validator';

describe('SubscriptionsController', () => {
  let controller: SubscriptionsController;
  let subscriptionsService: SubscriptionsService;
  let stripeCustomersService: CustomersStripeService;
  let stripeSubscriptionsService: SubscriptionsStripeService;

  const mockSubscription = {
    _id: '1',
    customer: 'customer_1',
    plan: 'plan_1',
    stripeCustomerId: 'stripe_customer_1',
    stripeSubscriptionId: 'stripe_subscription_1',
  };

  const mockSubscriptionsService = {
    create: jest.fn().mockImplementation((dto: CreateSubscriptionDto) => Promise.resolve({ _id: '1', ...dto })),
    findAll: jest.fn().mockResolvedValue([mockSubscription]),
    findOne: jest.fn().mockImplementation((id: string) => Promise.resolve({ _id: id, ...mockSubscription })),
    update: jest.fn().mockImplementation((id: string, dto: UpdateSubscriptionDto) => Promise.resolve({ _id: id, ...dto })),
    remove: jest.fn().mockResolvedValue({ _id: '1', ...mockSubscription }),
    findWhere: jest.fn().mockResolvedValue([mockSubscription]),
  };

  const mockStripeCustomersService = {
    updateCustomer: jest.fn().mockResolvedValue({ id: 'stripe_customer_1' }),
    deleteCustomer: jest.fn().mockResolvedValue({ id: 'stripe_customer_1' }),
  };

  const mockStripeSubscriptionsService = {
    createSubscription: jest.fn().mockImplementation((dto: any) => Promise.resolve({ id: 'stripe_subscription_1', ...dto })),
    updateSubscription: jest.fn().mockImplementation((id: string, dto: any) => Promise.resolve({ id: 'stripe_subscription_1', ...dto })),
    cancelSubscription: jest.fn().mockResolvedValue({ id: 'stripe_subscription_1' }),
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
      controllers: [SubscriptionsController],
      providers: [
        {
          provide: SubscriptionsService,
          useValue: mockSubscriptionsService,
        },
        {
          provide: CustomersStripeService,
          useValue: mockStripeCustomersService,
        },
        {
          provide: SubscriptionsStripeService,
          useValue: mockStripeSubscriptionsService,
        },
      ],
    }).compile();

    controller = module.get<SubscriptionsController>(SubscriptionsController);
    subscriptionsService = module.get<SubscriptionsService>(SubscriptionsService);
    stripeCustomersService = module.get<CustomersStripeService>(CustomersStripeService);
    stripeSubscriptionsService = module.get<SubscriptionsStripeService>(SubscriptionsStripeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  /*
  * Create
  */
  it('Create [201] - should create a subscription', async () => {
    const dto: CreateSubscriptionDto = {
      customer: 'customer_1',
      plan: 'plan_1',
    };

    const res = mockResponse() as Response;

    await controller.create(dto, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      code: 201,
      datas: { subscriptions: { _id: '1', ...dto }},
      message: 'subscriptions create with success',
      success: true
    });
    expect(subscriptionsService.create).toHaveBeenCalledWith({
      stripeCustomerId: 'stripe_customer_1',
      stripeSubscriptionId: 'stripe_subscription_1',
      ...dto
    });
    expect(stripeSubscriptionsService.createSubscription).toHaveBeenCalledWith({
      customer: 'stripe_customer_1',
      items: [{ plan: 'stripe_plan_1' }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    });
  });

  it('Create [422] - should handle validation errors when creating a subscription', async () => {
    const dto: CreateSubscriptionDto = {
      customer: 'customer_1',
      plan: 'plan_1',
    };

    const validationError = new ValidationError();
    validationError.property = 'customer';
    validationError.constraints = { isNotEmpty: 'customer should not be empty' };

    jest.spyOn(subscriptionsService, 'create').mockRejectedValueOnce([validationError]);

    const res = mockResponse() as Response;

    await controller.create(dto, res);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      code: 422,
      datas: { subscriptions: [validationError] },
      message: 'Validation errors occurred',
      success: false
    });
    expect(subscriptionsService.create).toHaveBeenCalledWith({
      stripeCustomerId: 'stripe_customer_1',
      stripeSubscriptionId: 'stripe_subscription_1',
      ...dto
    });
  });

  it('Create [500] - should handle internal server errors when creating a subscription', async () => {
    const dto: CreateSubscriptionDto = {
      customer: 'customer_1',
      plan: 'plan_1',
    };

    jest.spyOn(subscriptionsService, 'create').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;

    await controller.create(dto, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: { subscriptions: 'Internal server error' },
      message: 'An internal server error occurred',
      success: false
    });
    expect(subscriptionsService.create).toHaveBeenCalledWith({
      stripeCustomerId: 'stripe_customer_1',
      stripeSubscriptionId: 'stripe_subscription_1',
      ...dto
    });
  });

  /*
  * FindAll 
  */
  it('FindAll [200] - should return all subscriptions', async () => {
    const res = mockResponse() as Response;

    await controller.findAll(res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      code: 200,
      datas: { subscriptions: [mockSubscription] },
      message: 'subscriptions retrieve with success',
      success: true
    });
    expect(subscriptionsService.findAll).toHaveBeenCalled();
  });

  it('FindAll [404] - should handle not found error when returning all subscriptions', async () => {
    jest.spyOn(subscriptionsService, 'findAll').mockResolvedValueOnce([]);

    const res = mockResponse() as Response;

    await controller.findAll(res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      code: 404,
      datas: { subscriptions: 'Not Found' },
      message: 'subscriptions not found',
      success: false
    });
    expect(subscriptionsService.findAll).toHaveBeenCalled();
  });

  it('FindAll [500] - should handle internal server errors when returning all subscriptions', async () => {
    jest.spyOn(subscriptionsService, 'findAll').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;

    await controller.findAll(res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: { subscriptions: 'Internal server error' },
      message: 'subscriptions internal server error',
      success: false
    });
    expect(subscriptionsService.findAll).toHaveBeenCalled();
  });

  /*
  * FindOne
  */
  it('FindOne [200] - should return a single subscription by id', async () => {
    const res = mockResponse() as Response;

    await controller.findOne('1', res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      code: 200,
      datas: { subscriptions: { _id: '1', ...mockSubscription }},
      message: 'subscriptions retrieve with success',
      success: true
    });
    expect(subscriptionsService.findOne).toHaveBeenCalledWith('1');
  });

  it('FindOne [404] - should handle not found error when returning a single subscription by id', async () => {
    jest.spyOn(subscriptionsService, 'findOne').mockResolvedValueOnce(null);

    const res = mockResponse() as Response;

    await controller.findOne('1', res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      code: 404,
      datas: { subscriptions: 'Not Found' },
      message: 'subscriptions not found',
      success: false
    });
    expect(subscriptionsService.findOne).toHaveBeenCalledWith('1');
  });

  it('FindOne [500] - should handle internal server errors when returning a single subscription by id', async () => {
    jest.spyOn(subscriptionsService, 'findOne').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;

    await controller.findOne('1', res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: { subscriptions: 'Internal server error' },
      message: 'subscriptions internal server error',
      success: false
    });
    expect(subscriptionsService.findOne).toHaveBeenCalledWith('1');
  });

  /*
  * Update 
  */
  it('Update [404] - should handle not found error when updating a subscription by id', async () => {
    const dto: UpdateSubscriptionDto = { customer: 'customer_2', plan: 'plan_2' };

    jest.spyOn(subscriptionsService, 'findOne').mockResolvedValueOnce(null);

    const res = mockResponse() as Response;

    await controller.update('1', dto, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      code: 404,
      datas: { subscriptions: 'Not Found' },
      message: 'subscriptions not found',
      success: false
    });
    expect(subscriptionsService.findOne).toHaveBeenCalledWith('1');
  });

  it('Update [500] - should handle internal server errors when updating a subscription by id', async () => {
    const dto: UpdateSubscriptionDto = { customer: 'customer_2', plan: 'plan_2' };

    jest.spyOn(subscriptionsService, 'update').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;

    await controller.update('1', dto, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: { subscriptions: 'Internal server error' },
      message: 'subscriptions internal server error',
      success: false
    });
    expect(subscriptionsService.update).toHaveBeenCalledWith('1', dto);
  });

  it('Update [422] - should handle validation errors when updating a subscription by id', async () => {
    const dto: UpdateSubscriptionDto = { customer: 'customer_2', plan: 'plan_2' };

    const validationError = new ValidationError();
    validationError.property = 'customer';
    validationError.constraints = { isNotEmpty: 'customer should not be empty' };

    jest.spyOn(subscriptionsService, 'update').mockRejectedValueOnce([validationError]);

    const res = mockResponse() as Response;

    await controller.update('1', dto, res);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      code: 422,
      datas: { subscriptions: [validationError] },
      message: 'Validation errors occurred',
      success: false
    });
    expect(subscriptionsService.update).toHaveBeenCalledWith('1', dto);
  });

  /*
  * Delete 
  */
  it('Delete [200] - should delete a subscription by id', async () => {
    const res = mockResponse() as Response;

    await controller.delete('1', res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      code: 200,
      datas: { subscriptions: { removed: true }},
      message: 'subscriptions delete with success',
      success: true
    });
    expect(subscriptionsService.remove).toHaveBeenCalledWith('1');
  });

  it('Delete [404] - should handle not found error when deleting a subscription by id', async () => {
    jest.spyOn(subscriptionsService, 'findOne').mockResolvedValueOnce(null);

    const res = mockResponse() as Response;

    await controller.delete('1', res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      code: 404,
      datas: { subscriptions: {} },
      message: 'subscriptions not found',
      success: false
    });
    expect(subscriptionsService.findOne).toHaveBeenCalledWith('1');
  });

  it('Delete [500] - should handle internal server errors when deleting a subscription by id', async () => {
    jest.spyOn(subscriptionsService, 'remove').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;

    await controller.delete('1', res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: { subscriptions: 'Internal server error' },
      message: 'subscriptions internal server error',
      success: false
    });
    expect(subscriptionsService.remove).toHaveBeenCalledWith('1');
  });

  /*
  * FindMySubscription
  */
  it('FindMySubscription [200] - should return the subscription of the current user', async () => {
    const res = mockResponse() as Response;
    const req = mockRequest('customer_1') as Request;

    await controller.findMySubscription(res, req);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      code: 200,
      datas: { subscriptions: mockSubscription },
      message: 'subscriptions retrieve with success',
      success: true
    });
    expect(subscriptionsService.findWhere).toHaveBeenCalledWith({ where: { customer: 'customer_1' } });
  });

  it('FindMySubscription [404] - should handle not found error when no subscriptions are found for the current user', async () => {
    jest.spyOn(subscriptionsService, 'findWhere').mockResolvedValueOnce([]);

    const res = mockResponse() as Response;
    const req = mockRequest('customer_1') as Request;

    await controller.findMySubscription(res, req);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      code: 404,
      datas: { subscriptions: 'Not Found' },
      message: 'subscriptions not found',
      success: false
    });
    expect(subscriptionsService.findWhere).toHaveBeenCalledWith({ where: { customer: 'customer_1' } });
  });

  it('FindMySubscription [500] - should handle internal server errors when retrieving subscriptions for the current user', async () => {
    jest.spyOn(subscriptionsService, 'findWhere').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;
    const req = mockRequest('customer_1') as Request;

    await controller.findMySubscription(res, req);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: { subscriptions: 'Internal server error' },
      message: 'subscriptions internal server error',
      success: false
    });
    expect(subscriptionsService.findWhere).toHaveBeenCalledWith({ where: { customer: 'customer_1' } });
  });

  /*
  * CancelSubscription
  */
  it('CancelSubscription [200] - should cancel a subscription by id', async () => {
    const res = mockResponse() as Response;

    await controller.cancelSubscription('stripe_subscription_1', res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      code: 200,
      datas: { subscriptions: { id: 'stripe_subscription_1' }},
      message: 'subscriptions cancel with success',
      success: true
    });
    expect(stripeSubscriptionsService.cancelSubscription).toHaveBeenCalledWith('stripe_subscription_1');
  });

  it('CancelSubscription [404] - should handle not found error when cancelling a subscription by id', async () => {
    jest.spyOn(stripeSubscriptionsService, 'cancelSubscription').mockRejectedValueOnce(new Error('Not Found'));

    const res = mockResponse() as Response;

    await controller.cancelSubscription('stripe_subscription_1', res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      code: 404,
      datas: { subscriptions: 'Not Found' },
      message: 'subscriptions not found',
      success: false
    });
    expect(stripeSubscriptionsService.cancelSubscription).toHaveBeenCalledWith('stripe_subscription_1');
  });

  it('CancelSubscription [500] - should handle internal server errors when cancelling a subscription by id', async () => {
    jest.spyOn(stripeSubscriptionsService, 'cancelSubscription').mockRejectedValueOnce(new Error('Internal server error'));

    const res = mockResponse() as Response;

    await controller.cancelSubscription('stripe_subscription_1', res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      datas: { subscriptions: 'Internal server error' },
      message: 'subscriptions internal server error',
      success: false
    });
    expect(stripeSubscriptionsService.cancelSubscription).toHaveBeenCalledWith('stripe_subscription_1');
  });
});
