import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Column,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Quiz } from '../../quiz/entities/quiz.entity';
import { Option } from '../../option/entities/option.entity';
import { Answer } from '../../answer/entities/answer.entity';
import { Session } from '../../session/entities/session.entity';

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

  @ManyToOne(() => Session, (session) => session.participations)
  session: Session;

  @Column()
  clientId: string;

  @Column({ default: 0 })
  score: number;
}
