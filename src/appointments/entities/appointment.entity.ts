import { Appointment } from '@prisma/client';
import { PatientEntity } from 'src/patients/entities/patient.entity';
import { SpecialityEntity } from 'src/specialities/entities/speciality.entity';
import { UserEntity } from 'src/users/entities/user.entity';

export class AppointmentEntity implements Appointment {
  id: number;
  date: Date;
  patient_id: number;
  patient: PatientEntity;
  doctor_id: number;
  doctor: UserEntity;
  speciality_id: number;
  speciality: SpecialityEntity;
  created_at: Date;
  updated_at: Date;

  constructor(partial: Partial<AppointmentEntity>) {
    Object.assign(this, partial);
  }
}
