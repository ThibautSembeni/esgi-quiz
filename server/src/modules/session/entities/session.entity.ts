import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Quiz } from '../../quiz/entities/quiz.entity';

@Entity()
export class Session {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => User)
  creator: User;

  @ManyToOne(() => Quiz)
  quiz: Quiz;
}
