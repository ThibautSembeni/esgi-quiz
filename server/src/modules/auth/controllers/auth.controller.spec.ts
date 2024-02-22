import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../local-auth.guard';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { User, UserRoles } from '../../user/entities/user.entity';
import { UserService } from '../../user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { DatabaseModule } from '../../../database/database.modules';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Quiz } from '../../quiz/entities/quiz.entity';
import { Repository } from 'typeorm';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        LocalAuthGuard,
        JwtAuthGuard,
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(() => 'test_token'),
          },
        },
      ],
      imports: [DatabaseModule],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    authController = module.get<AuthController>(AuthController);
  });

  it('should login a user', async () => {
    const user = { username: 'test', password: 'test' };
    const result = { access_token: 'test_token' };

    jest.spyOn(authService, 'login').mockResolvedValue(result);

    expect(await authController.login({ body: user })).toBe(result);
  });

  it('should get user profile', async () => {
    const user = { username: 'test' };

    expect(await authController.getProfile({ user })).toBe(user);
  });

  it('should register a user', async () => {
    const user = { username: 'test', password: 'test' };
    const result: User = {
      username: 'test',
      id: 1,
      roles: UserRoles.USER,
      password: 'test',
      participations: [],
    };
    jest.spyOn(authService, 'register').mockResolvedValue(result);

    expect(await authController.register({ body: user })).toBe(result);
  });
});
