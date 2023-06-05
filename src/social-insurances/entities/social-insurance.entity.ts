import { Patient } from 'src/patients/entities/patient.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('social_insurances')
export class SocialInsurance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Patient, (patient) => patient.social_insurance)
  patients: Patient[];
}
