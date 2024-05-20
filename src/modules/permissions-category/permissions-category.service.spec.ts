import { Test, TestingModule } from '@nestjs/testing';
import { PermissionsCategoryService } from '@modules/permissions-category/permissions-category.service';

describe('PermissionsCategoryService', () => {
  let service: PermissionsCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissionsCategoryService],
    }).compile();

    service = module.get<PermissionsCategoryService>(PermissionsCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
