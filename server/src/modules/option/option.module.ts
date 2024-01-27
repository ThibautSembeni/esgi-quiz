import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OptionController } from './controllers/option.controller';
import { OptionService } from './services/option.service';
import { Option } from './entities/option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Option])],
  controllers: [OptionController],
  providers: [OptionService],
})
export class OptionModule {}
