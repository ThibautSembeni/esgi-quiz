import { Controller, Get, Req } from '@nestjs/common';
import { QuestionService } from '../services/question.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  async findAll(@Req() req: any) {
    return await this.questionService.findAll(req.user);
  }
}
