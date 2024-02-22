import { Test, TestingModule } from '@nestjs/testing';
import { QuizService } from './quiz.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from '../entities/quiz.entity';
import { CreateQuizDto } from '../dto/create-quiz.dto';

describe('QuizService', () => {
  let quizService: QuizService;
  let quizRepository: Repository<Quiz>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuizService,
        {
          provide: getRepositoryToken(Quiz),
          useClass: Repository,
        },
      ],
    }).compile();

    quizService = module.get<QuizService>(QuizService);
    quizRepository = module.get<Repository<Quiz>>(getRepositoryToken(Quiz));
  });

  it('should be defined', () => {
    expect(quizService).toBeDefined();
  });

  it('should create a quiz', async () => {
    const quizDto: CreateQuizDto = { name: 'Quiz 1' };
    const quiz: Quiz = {
      id: 1,
      name: 'Quiz 1',
      questions: [],
      participations: [],
    };

    jest.spyOn(quizRepository, 'save').mockResolvedValue(quiz);

    expect(await quizService.create(quizDto)).toBe(quiz);
  });

  it('should get all quizzes', async () => {
    const quizList: Quiz[] = [
      { id: 1, name: 'Quiz 1', questions: [], participations: [] },
      { id: 2, name: 'Quiz 2', questions: [], participations: [] },
    ];

    jest.spyOn(quizRepository, 'find').mockResolvedValue(quizList);

    expect(await quizService.findAll()).toBe(quizList);
  });

  it('should get a quiz by id', async () => {
    const quiz: Quiz = {
      id: 1,
      name: 'Quiz 1',
      questions: [],
      participations: [],
    };

    jest.spyOn(quizRepository, 'findOne').mockResolvedValue(quiz);

    expect(await quizService.findOne({ where: { id: 1 } })).toBe(quiz);
  });

  it('should update a quiz', async () => {
    const quizDto: CreateQuizDto = { name: 'Updated Quiz' };
    const quiz: Quiz = {
      id: 1,
      name: 'Updated Quiz',
      questions: [],
      participations: [],
    };

    jest.spyOn(quizRepository, 'save').mockResolvedValue(quiz);

    expect(await quizService.update(1, quizDto)).toBe(quiz);
  });

  it('should delete a quiz', async () => {
    const quiz: Quiz = {
      id: 1,
      name: 'Quiz 1',
      questions: [],
      participations: [],
    };

    jest.spyOn(quizRepository, 'findOne').mockResolvedValue(quiz);
    jest.spyOn(quizRepository, 'remove').mockResolvedValue(quiz);

    expect(await quizService.remove({ where: { id: 1 } })).toBe(quiz);
  });
});
