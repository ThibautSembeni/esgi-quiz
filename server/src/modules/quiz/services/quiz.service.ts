import { Inject, Injectable } from '@nestjs/common';
import { Quiz } from '../entities/quiz.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
  ) {}

  async findAll(): Promise<Quiz[]> {
    return await this.quizRepository.find();
  }
}
