import { Controller, Get } from '@nestjs/common';
import { AnswerService } from '../services/answer.service';
import { Public } from '../../../constants';

@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Public()
  @Get()
  async findAll() {
    return await this.answerService.findAll();
  }
}
