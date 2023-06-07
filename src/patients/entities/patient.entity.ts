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

  @Column({ nullable: true, type: 'date' })
  birth_date: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ default: true })
  is_alive: boolean;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  street: string;

  @ManyToOne(
    () => SocialInsurance,
    (socialInsurance) => socialInsurance.patients,
  )
  @JoinColumn({ name: 'social_insurance_id' })
  social_insurance: SocialInsurance;

  @OneToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
