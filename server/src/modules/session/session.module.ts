import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { SessionController } from './controllers/session.controller';
import { SessionService } from './services/session.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { QuizModule } from '../quiz/quiz.module';
import { SessionGateway } from './gateway/session.gateway';
import { ParticipationService } from '../participation/services/participation.service';
import { ParticipationModule } from '../participation/participation.module';
import { UserService } from '../user/services/user.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Session]),
    QuizModule,
    UserModule,
    ParticipationModule,
  ],
  controllers: [SessionController],
  providers: [
    SessionService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    SessionGateway,
  ],
})
export class SessionModule {}
