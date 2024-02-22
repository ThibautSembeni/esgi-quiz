import { Test, TestingModule } from '@nestjs/testing';
import { QuizController } from './quiz.controller';
import { QuizService } from '../services/quiz.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Quiz } from '../entities/quiz.entity';
import { Repository } from 'typeorm';
import { CreateQuizDto } from '../dto/create-quiz.dto';
import { UpdateQuizDto } from '../dto/update-quiz.dto';

describe('QuizController', () => {
  let quizController: QuizController;
  let quizService: QuizService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizController],
      providers: [
        QuizService,
        {
          provide: getRepositoryToken(Quiz),
          useClass: Repository,
        },
      ],
    }).compile();

    quizService = module.get<QuizService>(QuizService);
    quizController = module.get<QuizController>(QuizController);
  });

  it('should be defined', () => {
    expect(quizController).toBeDefined();
  });

  it('should create a quiz', async () => {
    const quizDto: CreateQuizDto = { name: 'Quiz 1' };
    const quiz: Quiz = {
      id: 1,
      name: 'Quiz 1',
      questions: [],
      participations: [],
    };

    jest.spyOn(quizService, 'create').mockResolvedValue(quiz);

    expect(await quizController.create(quizDto)).toBe(quiz);
  });

  it('should get all quizzes', async () => {
    const quizList: Quiz[] = [
      { id: 1, name: 'Quiz 1', questions: [], participations: [] },
      { id: 2, name: 'Quiz 2', questions: [], participations: [] },
    ];

    jest.spyOn(quizService, 'findAll').mockResolvedValue(quizList);

    expect(await quizController.findAll()).toBe(quizList);
  });

  it('should get a quiz by id', async () => {
    const quiz: Quiz = {
      id: 1,
      name: 'Quiz 1',
      questions: [],
      participations: [],
    };

    jest.spyOn(quizService, 'findOne').mockResolvedValue(quiz);

    expect(await quizController.findOne('1')).toBe(quiz);
  });

  it('should update a quiz', async () => {
    const quizDto: UpdateQuizDto = { name: 'Updated Quiz' };
    const quiz: Quiz = {
      id: 1,
      name: 'Updated Quiz',
      questions: [],
      participations: [],
    };

    jest.spyOn(quizService, 'update').mockResolvedValue(quiz);

    expect(await quizController.update('1', quizDto)).toBe(quiz);
  });

  it('should delete a quiz', async () => {
    const quiz: Quiz = {
      id: 1,
      name: 'Quiz 1',
      questions: [],
      participations: [],
    };

    jest.spyOn(quizService, 'remove').mockResolvedValue(quiz);

    expect(await quizController.remove('1')).toBe(quiz);
  });
});
