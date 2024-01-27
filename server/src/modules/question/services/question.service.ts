import { Injectable } from '@nestjs/common';
import { Question } from '../entities/question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  async findAll(): Promise<Question[]> {
    return await this.questionRepository.find();
  }
}
