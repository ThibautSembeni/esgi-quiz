import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participation } from './entities/participation.entity';
import { ParticipationController } from './controllers/participation.controller';
import { ParticipationService } from './services/participation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Participation])],
  controllers: [ParticipationController],
  providers: [ParticipationService],
})
export class ParticipationModule {}
