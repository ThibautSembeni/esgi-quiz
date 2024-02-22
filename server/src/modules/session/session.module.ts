import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { SessionController } from './controllers/session.controller';
import { SessionService } from './services/session.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Session])],
  controllers: [SessionController],
  providers: [
    SessionService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class SessionModule {}
