import { Injectable } from '@nestjs/common';
import { Session } from '../entities/session.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSessionDto } from '../dto/create-session.dto';
import { User } from '../../user/entities/user.entity';
import Sqids from 'sqids';
import { Quiz } from '../../quiz/entities/quiz.entity';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
  ) {}

  async findAll(): Promise<Session[]> {
    return await this.sessionRepository.find();
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
}
