import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Participation } from '../entities/participation.entity';
import { CreateSessionDto } from '../../session/dto/create-session.dto';
import { User } from '../../user/entities/user.entity';
import { Quiz } from '../../quiz/entities/quiz.entity';
import { Session } from '../../session/entities/session.entity';
import Sqids from 'sqids';
import { CreateParticipationDto } from '../dto/create-participation.dto';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { UpdateParticipationDto } from '../dto/update-participation.dto';

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

  async count(options: FindOptionsWhere<Participation>): Promise<number> {
    return await this.participationRepository.countBy(options);
  }

  async deleteByClientId(id: string): Promise<void> {
    const participant = await this.participationRepository.findOne({
      where: {
        clientId: id,
      },
    });
    if (!participant) {
      throw new NotFoundException(
        `Participation with clientId ${id} not found`,
      );
    }
    await this.participationRepository.delete(participant);
  }

  async findOne(
    options: FindManyOptions<Participation>,
  ): Promise<Participation> {
    return await this.participationRepository.findOne(options);
  }

  async findMany(
    options: FindManyOptions<Participation>,
  ): Promise<Participation[]> {
    return await this.participationRepository.find(options);
  }

  async update(
    id: number,
    participation: UpdateParticipationDto,
  ): Promise<Participation> {
    return await this.participationRepository.save({ id, ...participation });
  }
}
