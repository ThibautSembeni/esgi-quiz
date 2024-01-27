import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Participation } from '../../participation/entities/participation.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Participation, (participation) => participation.user)
  participations: Participation[];
}
