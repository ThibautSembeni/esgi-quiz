import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Participation } from '../../participation/entities/participation.entity';
import { Question } from '../../question/entities/question.entity';
import { Option } from '../../option/entities/option.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Participation, (participation) => participation.answers)
  participation: Participation;

  @ManyToOne(() => Question, (question) => question.answers)
  question: Question;

  @ManyToOne(() => Option, (option) => option.answers)
  option: Option;
}
