import { Controller, Get } from '@nestjs/common';
import { QuizService } from '../services/quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  async findAll() {
    return await this.quizService.findAll();
  }
}
