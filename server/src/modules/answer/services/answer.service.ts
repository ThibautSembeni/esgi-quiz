import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Answer } from '../entities/answer.entity';
import { CreateAnswerDto } from '../dto/create-answer-dto';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
  ) {}

  async findAll(): Promise<Answer[]> {
    return await this.answerRepository.find();
  }

  async create(answer: CreateAnswerDto): Promise<Answer> {
    return await this.answerRepository.save(answer);
  }

  async findMany(options: FindManyOptions<Answer>): Promise<Answer[]> {
    return await this.answerRepository.find(options);
  }

  async findOne(options: FindOneOptions<Answer>): Promise<Answer> {
    return await this.answerRepository.findOne(options);
  }
  async countAnswersByQuestion(
    questionId: number,
    sessionId: string,
  ): Promise<{ optionTitle: string; count: number; isCorrect: boolean }[]> {
    const queryBuilder = this.answerRepository.createQueryBuilder('answer');

    queryBuilder.leftJoinAndSelect('answer.option', 'option');
    queryBuilder.leftJoinAndSelect('answer.participation', 'participation');

    const result = await queryBuilder
      .select('option.title', 'optionTitle')
      .addSelect('COUNT(DISTINCT(participation.clientId))', 'count')
      .addSelect('option.is_correct', 'isCorrect')
      .where('option.questionId = :questionId', { questionId })
      .andWhere('participation.sessionId = :sessionId', { sessionId })
      .addGroupBy('option.title')
      .addGroupBy('option.is_correct')
      .getRawMany();

    return result.map((row) => ({
      optionTitle: row.optionTitle,
      count: parseInt(row.count),
      isCorrect: row.isCorrect,
    }));
  }
}
