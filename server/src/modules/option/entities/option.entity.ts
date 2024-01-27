import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Question } from '../../question/entities/question.entity';
import { Answer } from '../../answer/entities/answer.entity';

@Entity()
export class Option {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  is_correct: boolean;

  @ManyToOne(() => Question, (question) => question.options)
  question: Question;

  @OneToMany(() => Answer, (answer) => answer.option)
  answers: Answer[];
}
