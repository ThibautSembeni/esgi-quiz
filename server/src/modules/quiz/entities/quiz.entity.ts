import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from '../../question/entities/question.entity';
import { Participation } from '../../participation/entities/participation.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Question, (question) => question.quiz)
  questions: Question[];

  @OneToMany(() => Participation, (participation) => participation.quiz)
  participations: Participation[];

  @ManyToOne(() => User)
  user: User;
}
