import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { SessionService } from '../services/session.service';
import { CreateQuizDto } from '../../quiz/dto/create-quiz.dto';
import { CreateSessionDto } from '../dto/create-session.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get()
  async findAll() {
    return await this.sessionService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createSessionDto: CreateSessionDto, @Req() req: any) {
    return this.sessionService.create(createSessionDto, req.user);
  }
}
