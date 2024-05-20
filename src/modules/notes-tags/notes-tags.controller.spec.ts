import { Test, TestingModule } from '@nestjs/testing';
import { NotesTagsController } from './notes-tags.controller';
import { NotesTagsService } from './notes-tags.service';

describe('NotesTagsController', () => {
  let controller: NotesTagsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotesTagsController],
      providers: [NotesTagsService],
    }).compile();

    controller = module.get<NotesTagsController>(NotesTagsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
