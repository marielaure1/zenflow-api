import { Test, TestingModule } from '@nestjs/testing';
import { ZenflowTeamService } from './zenflow-team.service';

describe('ZenflowTeamService', () => {
  let service: ZenflowTeamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ZenflowTeamService],
    }).compile();

    service = module.get<ZenflowTeamService>(ZenflowTeamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
