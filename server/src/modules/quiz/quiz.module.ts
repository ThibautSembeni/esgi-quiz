import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { QuizController } from './controllers/quiz.controller';
import { QuizService } from './services/quiz.service';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz])],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
