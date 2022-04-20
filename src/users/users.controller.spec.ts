import { Test, TestingModule } from '@nestjs/testing';
import { usersController } from './users.controller';

describe('usersController', () => {
  let controller: usersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [usersController],
    }).compile();

    controller = module.get<usersController>(usersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
