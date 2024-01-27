import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Quiz } from '../../quiz/entities/quiz.entity';
import { Option } from '../../option/entities/option.entity';
import { Answer } from '../../answer/entities/answer.entity';

@Entity()
export class Participation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.participations)
  user: User;

  @ManyToOne(() => Quiz, (quiz) => quiz.participations)
  quiz: Quiz;

  @OneToMany(() => Answer, (answer) => answer.participation)
  answers: Answer[];
}
