import { Test, TestingModule } from '@nestjs/testing';
import { PermissionsCategoryController } from '@modules/permissions-category/permissions-category.controller';
import { PermissionsCategoryService } from '@modules/permissions-category/permissions-category.service';

describe('PermissionsCategoryController', () => {
  let controller: PermissionsCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionsCategoryController],
      providers: [PermissionsCategoryService],
    }).compile();

    controller = module.get<PermissionsCategoryController>(PermissionsCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
