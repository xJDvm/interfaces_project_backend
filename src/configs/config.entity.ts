// config.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Users } from '../users/entities/user.entity';

@Entity()
export class Config {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  color1: string;

  @Column({ nullable: true })
  color2?: string;

  @Column({ nullable: true })
  color3?: string;

  @Column({ nullable: true })
  h1size?: string;

  @Column({ nullable: true })
  h2size?: string;

  @Column({ nullable: true })
  psize?: string;

  @Column({ nullable: true })
  fonttitle?: string;

  @Column({ nullable: true })
  fontp?: string;

  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => Users, user => user.configs)
  user: Users;
}
