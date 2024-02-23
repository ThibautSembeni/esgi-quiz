import { Inject, Injectable } from '@nestjs/common';
import { Quiz } from '../entities/quiz.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateQuizDto } from '../dto/create-quiz.dto';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
  ) {}

  async create(createQuizDto: CreateQuizDto): Promise<Quiz> {
    return await this.quizRepository.save(createQuizDto);
  }

  async findAll(options: FindManyOptions<Quiz>): Promise<Quiz[]> {
    return await this.quizRepository.find(options);
  }

  async findOne(options: FindOneOptions<Quiz>): Promise<Quiz> {
    return await this.quizRepository.findOne(options);
  }

  async update(id: number, updateQuizDto: CreateQuizDto): Promise<Quiz> {
    return await this.quizRepository.save({ id, ...updateQuizDto });
  }

  async remove(options: FindOneOptions<Quiz>): Promise<Quiz> {
    const quiz = await this.findOne(options);
    return await this.quizRepository.remove(quiz);
  }
}
