import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.modules';
import { QuizModule } from './modules/quiz/quiz.module';
import { AnswerModule } from './modules/answer/answer.module';
import { OptionModule } from './modules/option/option.module';
import { ParticipationModule } from './modules/participation/participation.module';
import { QuestionModule } from './modules/question/question.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { SessionModule } from './modules/session/session.module';

@Module({
  imports: [
    DatabaseModule,
    QuizModule,
    AnswerModule,
    OptionModule,
    ParticipationModule,
    QuestionModule,
    UserModule,
    AuthModule,
    SessionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
