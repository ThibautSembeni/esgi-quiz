import { Injectable } from '@nestjs/common';
import { Option } from '../entities/option.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(Option)
    private optionRepository: Repository<Option>,
  ) {}

  async findAll(): Promise<Option[]> {
    return await this.optionRepository.find();
  }
}
