import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionsController } from '@modules/subscriptions/subscriptions.controller';
import { SubscriptionsService } from '@/modules/subscriptions/subscriptions.service';

describe('SubscribesController', () => {
  let controller: SubscriptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubscriptionsController],
      providers: [SubscriptionsService],
    }).compile();

    controller = module.get<SubscriptionsController>(SubscriptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
