import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Participation } from '../entities/participation.entity';
import { CreateSessionDto } from '../../session/dto/create-session.dto';
import { User } from '../../user/entities/user.entity';
import { Quiz } from '../../quiz/entities/quiz.entity';
import { Session } from '../../session/entities/session.entity';
import Sqids from 'sqids';
import { CreateParticipationDto } from '../dto/create-participation.dto';

@Injectable()
export class ParticipationService {
  constructor(
    @InjectRepository(Participation)
    private participationRepository: Repository<Participation>,
  ) {}

  async findAll(): Promise<Participation[]> {
    return await this.participationRepository.find();
  }

  async create(
    participationDto: CreateParticipationDto,
  ): Promise<Participation> {
    return await this.participationRepository.save(participationDto);
  }
}
