import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { QuestionController } from './controllers/question.controller';
import { QuestionService } from './services/question.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OptionModule } from '../option/option.module';
import { QuizModule } from '../quiz/quiz.module';

@Module({
  imports: [TypeOrmModule.forFeature([Question]), OptionModule, QuizModule],
  controllers: [QuestionController],
  providers: [
    QuestionService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [QuestionService],
})
export class QuestionModule {}
