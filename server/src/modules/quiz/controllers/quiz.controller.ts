import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { QuizService } from '../services/quiz.service';
import { CreateQuizDto } from '../dto/create-quiz.dto';
import { UpdateQuizDto } from '../dto/update-quiz.dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  create(@Body() createUserDto: CreateQuizDto) {
    return this.quizService.create(createUserDto);
  }

  @Get()
  async findAll(@Req() req: any) {
    return await this.quizService.findAll({
      where: { user: req.user },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizService.findOne({
      where: { id: +id },
      relations: ['questions', 'participations'],
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizService.update(+id, updateQuizDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizService.remove({
      where: { id: +id },
      relations: ['questions', 'participations'],
    });
  }
}
