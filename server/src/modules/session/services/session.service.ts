import { Injectable } from '@nestjs/common';
import { Session } from '../entities/session.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateSessionDto } from '../dto/create-session.dto';
import { User } from '../../user/entities/user.entity';
import Sqids from 'sqids';
import { Quiz } from '../../quiz/entities/quiz.entity';
import { UpdateSessionDto } from '../dto/update-session.dto';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
  ) {}

  async findAll(options: FindManyOptions): Promise<Session[]> {
    return await this.sessionRepository.find(options);
  }

  async create(
    createSessionDto: CreateSessionDto,
    user: User,
  ): Promise<{ quiz: Quiz; creator: Omit<User, 'password'>; id: string }> {
    const session = new Session();
    session.quiz = createSessionDto.quiz;
    session.creator = user;
    const sqids = new Sqids();
    session.id = sqids.encode([Date.now(), Math.floor(Math.random() * 1000)]);
    const savedSession = await this.sessionRepository.save(session);

    const { password, ...creatorWithoutPassword } = savedSession.creator;
    const result = { ...savedSession, creator: creatorWithoutPassword };

    return result;
  }

  async findOne(options: FindOneOptions<Session>): Promise<Session> {
    return await this.sessionRepository.findOne({
      ...options,
      relations: ['quiz', 'creator'],
    });
  }

  async update(
    id: string,
    updateSessionDto: UpdateSessionDto,
  ): Promise<Session> {
    return await this.sessionRepository.save({ id, ...updateSessionDto });
  }
}
