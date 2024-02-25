import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SessionService } from '../services/session.service';
import { CreateQuizDto } from '../../quiz/dto/create-quiz.dto';
import { CreateSessionDto } from '../dto/create-session.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { QuizService } from '../../quiz/services/quiz.service';
import { SessionStatus } from '../entities/session.entity';

@Controller('session')
export class SessionController {
  constructor(
    private readonly sessionService: SessionService,
    private quizService: QuizService,
  ) {}

  @Get()
  async findAll(@Req() req: any) {
    return await this.sessionService.findAll({
      where: {
        creator: req.user,
        status: SessionStatus.INACTIVE,
      },
      relations: ['quiz', 'creator'],
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createSessionDto: CreateSessionDto, @Req() req: any) {
    const isHisQuiz = await this.quizService.findOne({
      where: { id: +createSessionDto.quiz, user: req.user },
    });
    if (!isHisQuiz) {
      throw new HttpException(
        'You can only create a session for your own quiz',
        HttpStatus.FORBIDDEN,
      );
    }
    return this.sessionService.create(createSessionDto, req.user);
  }
}
