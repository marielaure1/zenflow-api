import { Test, TestingModule } from '@nestjs/testing';
import { PermissionsUsersController } from '@modules/permissions-users/permissions-users.controller';
import { PermissionsUsersService } from '@modules/permissions-users/permissions-users.service';

describe('PermissionsUsersController', () => {
  let controller: PermissionsUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionsUsersController],
      providers: [PermissionsUsersService],
    }).compile();

    controller = module.get<PermissionsUsersController>(PermissionsUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
