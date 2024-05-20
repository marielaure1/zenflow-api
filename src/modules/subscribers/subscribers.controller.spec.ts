import { Test, TestingModule } from '@nestjs/testing';
import { SubscribersController } from '@modules/subscribers/subscribers.controller';
import { SubscribersService } from '@modules/subscribers/subscribers.service';

describe('SubscribersController', () => {
  let controller: SubscribersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubscribersController],
      providers: [SubscribersService],
    }).compile();

    controller = module.get<SubscribersController>(SubscribersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
