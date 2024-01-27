import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Quiz } from '../../quiz/entities/quiz.entity';
import { Option } from '../../option/entities/option.entity';
import { Answer } from '../../answer/entities/answer.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  quiz: Quiz;

  @OneToMany(() => Option, (option) => option.question)
  options: Option[];

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];
}
