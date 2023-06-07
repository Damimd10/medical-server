import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Patient } from '../../patients/entities/patient.entity';

@Entity('social_insurances')
export class SocialInsurance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Patient, (patient) => patient.social_insurance)
  patients: Patient[];
}
