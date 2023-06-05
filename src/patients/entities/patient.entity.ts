import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { SocialInsurance } from 'src/social-insurances/entities/social-insurance.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  social_insurance_number: string;

  @Column({ type: 'date' })
  birth_date: string;

  @Column()
  phone_number: string;

  @Column()
  is_alive: boolean;

  @Column()
  email: string;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  street: string;

  @ManyToOne(
    () => SocialInsurance,
    (socialInsurance) => socialInsurance.patients,
  )
  social_insurance: SocialInsurance;

  @OneToOne(() => User)
  @JoinColumn()
  created_by: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
