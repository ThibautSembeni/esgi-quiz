import { Controller, Get } from '@nestjs/common';
import { ParticipationService } from '../services/participation.service';

@Controller('participation')
export class ParticipationController {
  constructor(private readonly participationService: ParticipationService) {}

  @Get()
  async findAll() {
    return await this.participationService.findAll();
  }
}
