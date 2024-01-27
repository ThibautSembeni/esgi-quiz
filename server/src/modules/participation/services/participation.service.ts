import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Participation } from '../entities/participation.entity';

@Injectable()
export class ParticipationService {
  constructor(
    @InjectRepository(Participation)
    private participationRepository: Repository<Participation>,
  ) {}

  async findAll(): Promise<Participation[]> {
    return await this.participationRepository.find();
  }
}
