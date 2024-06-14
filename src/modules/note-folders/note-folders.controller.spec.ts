import { Test, TestingModule } from '@nestjs/testing';
import { NoteFoldersController } from './note-folders.controller';
import { NoteFoldersService } from './note-folders.service';

describe('NoteFoldersController', () => {
  let controller: NoteFoldersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoteFoldersController],
      providers: [NoteFoldersService],
    }).compile();

    controller = module.get<NoteFoldersController>(NoteFoldersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
