import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Users } from './user.entity';

@Entity()
export class Address {
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  city: string;

  @Column({ type: 'float', nullable: true })
  lat: number;

  @Column({ type: 'float', nullable: true })
  lon: number;

  @Column({ type: 'varchar', length: 20, nullable: true })
  postcode: string;

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

  @Column({ type: 'date', nullable: true })
  birthdate: Date;

  @Column({ nullable: true })
  gender: string;

  @Column({ type: 'bigint', nullable: true })
  phone: number;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column(type => Address)
  address: Address;

  @Column({ nullable: true })
  imagePath?: string;

  @Column({ nullable: true })
  timezone: string;
}
