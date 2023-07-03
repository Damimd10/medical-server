import { Appointment, AppointmentStatus } from '@prisma/client';
import { PatientEntity } from 'src/patients/entities/patient.entity';
import { SpecialityEntity } from 'src/specialities/entities/speciality.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { OrganizationEntity } from 'src/organizations/entities/organization.entity';

export class AppointmentEntity implements Appointment {
  id: number;
  date: Date;
  patient_id: number;
  patient: PatientEntity;
  doctor_id: number;
  doctor: UserEntity;
  speciality_id: number;
  speciality: SpecialityEntity;
  organization_id: number;
  organization: OrganizationEntity;
  created_at: Date;
  updated_at: Date;
  status: AppointmentStatus;

  constructor(partial: Partial<AppointmentEntity>) {
    Object.assign(this, partial);
  }
}
