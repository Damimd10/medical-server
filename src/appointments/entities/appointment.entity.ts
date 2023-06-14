import { Appointment } from '@prisma/client';
import { PatientEntity } from 'src/patients/entities/patient.entity';
import { SpecialityEntity } from 'src/specialities/entities/speciality.entity';
import { UserEntity } from 'src/users/entities/user.entity';

export class AppointmentEntity implements Appointment {
  id: number;
  date: Date;
  patientId: number;
  patient: PatientEntity;
  doctorId: number;
  doctor: UserEntity;
  specialityId: number;
  speciality: SpecialityEntity;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<AppointmentEntity>) {
    Object.assign(this, partial);
  }
}
