import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Question } from '../entities/question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { CreateQuestionDto } from '../dto/create-question-dto';
import { Option } from '../../option/entities/option.entity';
import { OptionService } from '../../option/services/option.service';
import { Quiz } from '../../quiz/entities/quiz.entity';
import { QuizService } from '../../quiz/services/quiz.service';
@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @Inject(OptionService)
    private readonly optionService: OptionService,
    @Inject(QuizService)
    private readonly quizService: QuizService,
  ) {}

  async findAll(user: User): Promise<Question[]> {
    return await this.questionRepository
      .createQueryBuilder('question')
      .innerJoinAndSelect('question.quiz', 'quiz')
      .where('quiz.user = :userId', { userId: user.id })
      .getMany();
  }

  async create(
    createQuestionDto: CreateQuestionDto,
    user: User,
  ): Promise<Question> {
    const quiz = await this.quizService.findOne({
      where: { id: createQuestionDto.quiz },
      relations: ['user'],
    });
    if (!quiz || quiz.user.id !== user.id) {
      throw new HttpException(
        'Unauthorized operation',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const question = await this.questionRepository.save(
      createQuestionDto as any,
    );

    for (const optionDto of createQuestionDto.options) {
      await this.optionService.create(optionDto, question);
    }

    return question;
  }
}
