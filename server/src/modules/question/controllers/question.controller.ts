import { Controller, Get } from '@nestjs/common';
import {QuestionService} from "../services/question.service";

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  async findAll() {
    return await this.questionService.findAll();
  }
}
