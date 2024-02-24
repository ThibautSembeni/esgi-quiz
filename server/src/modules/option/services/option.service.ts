import { Injectable } from '@nestjs/common';
import { Option } from '../entities/option.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOneOptions, Repository } from 'typeorm';
import { CreateOptionDto } from '../dto/create-option-dto';
import { Question } from '../../question/entities/question.entity';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(Option)
    private optionRepository: Repository<Option>,
  ) {}

  async findAll(): Promise<Option[]> {
    return await this.optionRepository.find();
  }

  async create(
    optionDto: CreateOptionDto,
    question: Question,
  ): Promise<Option> {
    const option = this.optionRepository.create({ ...optionDto, question });
    await this.optionRepository.save(option);
    return option;
  }

  async findOne(options: FindOneOptions<Option>): Promise<Option> {
    return await this.optionRepository.findOne(options);
  }
}
