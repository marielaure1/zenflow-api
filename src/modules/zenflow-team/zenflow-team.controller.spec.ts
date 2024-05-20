import { Test, TestingModule } from '@nestjs/testing';
import { ZenflowTeamController } from './zenflow-team.controller';
import { ZenflowTeamService } from './zenflow-team.service';

describe('ZenflowTeamController', () => {
  let controller: ZenflowTeamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ZenflowTeamController],
      providers: [ZenflowTeamService],
    }).compile();

    controller = module.get<ZenflowTeamController>(ZenflowTeamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
