import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { User, UserRoles } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(options: FindOneOptions<User>): Promise<User> {
    return await this.userRepository.findOne(options);
  }

  async create(user: { username: string; password: string }): Promise<User> {
    return await this.userRepository.save(user);
  }
  async createGuest(user: { username: string }): Promise<User> {
    return await this.userRepository.save({ ...user, roles: UserRoles.GUEST });
  }
}
