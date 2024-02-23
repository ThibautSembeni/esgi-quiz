import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Participation } from '../../participation/entities/participation.entity';
export enum UserRoles {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ nullable: true })
  password: string;

  @OneToMany(() => Participation, (participation) => participation.user)
  participations: Participation[];

  @Column({
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.USER,
  })
  roles: UserRoles;
}
