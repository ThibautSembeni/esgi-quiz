import { Injectable } from '@nestjs/common';
import { Question } from '../entities/question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  async findAll(user: User): Promise<Question[]> {
    return await this.questionRepository
      .createQueryBuilder('question')
      .innerJoinAndSelect('question.quiz', 'quiz')
      .where('quiz.user = :userId', { userId: user.id })
      .getMany();
  }
}
