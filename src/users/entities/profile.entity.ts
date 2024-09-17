import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Users } from './user.entity';

class Address {
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  lat: number;

  @Column({ nullable: true })
  lon: number;

  @Column({ nullable: true })
  postcode: number;

  @Column({ nullable: true })
  street: string;
}

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Users, user => user.profile, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: Users;

  @Column({ nullable: true })
  firstname: string;

  @Column({ nullable: true })
  lastname: string;

  @Column({ nullable: true })
  birthdate: Date;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column(type => Address)
  address: Address;
}
