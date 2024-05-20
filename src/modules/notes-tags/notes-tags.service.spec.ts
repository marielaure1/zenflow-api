import { Test, TestingModule } from '@nestjs/testing';
import { NotesTagsService } from './notes-tags.service';

describe('NotesTagsService', () => {
  let service: NotesTagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotesTagsService],
    }).compile();

    service = module.get<NotesTagsService>(NotesTagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
