import { Controller, Get } from '@nestjs/common';
import { OptionService } from '../services/option.service';

@Controller('option')
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @Get()
  async findAll() {
    return await this.optionService.findAll();
  }
}
