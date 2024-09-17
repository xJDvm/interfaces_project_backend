import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn, OneToOne, CreateDateColumn } from 'typeorm';
import { Profile } from './profile.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToOne(() => Profile, profile => profile.user, { cascade: true })
  profile: Profile;
}
