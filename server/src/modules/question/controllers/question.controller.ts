import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { QuestionService } from '../services/question.service';
import { CreateQuestionDto } from '../dto/create-question-dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  async findAll(@Req() req: any) {
    return await this.questionService.findAll(req.user);
  }

  @Post()
  async create(@Body() createQuestionDto: CreateQuestionDto, @Req() req: any) {
    return await this.questionService.create(createQuestionDto, req.user);
  }
}
