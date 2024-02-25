import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Quiz } from '../../quiz/entities/quiz.entity';
import { Participation } from '../../participation/entities/participation.entity';

export enum SessionStatus {
  INACTIVE = 'inactive',
  STARTED = 'started',
  FINISH = 'finish',
}
@Entity()
export class Session {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => User)
  creator: User;

  @ManyToOne(() => Quiz)
  quiz: Quiz;

  @Column({
    type: 'enum',
    enum: SessionStatus,
    default: SessionStatus.INACTIVE,
  })
  status: string;

  @OneToMany(() => Participation, (participation) => participation.session)
  participations: Participation[];

  @Column({ nullable: true })
  creatorWsId: string;
}
