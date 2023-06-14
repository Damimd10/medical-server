import { Patient } from '@prisma/client';

export class PatientEntity implements Patient {
  id: number;
  name: string;
  surname: string;
  socialInsuranceNumber: string;
  socialInsuranceId: number;
  birthDate: string;
  phoneNumber: string;
  isAlive: boolean;
  email: string;
  country: string;
  city: string;
  street: string;
  createdById: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<PatientEntity>) {
    Object.assign(this, partial);
  }
}
