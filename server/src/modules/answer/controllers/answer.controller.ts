import { Controller, Get } from '@nestjs/common';
import { AnswerService } from '../services/answer.service';

@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Get()
  async findAll() {
    return await this.answerService.findAll();
  }
}
