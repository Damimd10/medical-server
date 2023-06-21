import { Patient } from '@prisma/client';

export class PatientEntity implements Patient {
  id: number;
  name: string;
  surname: string;
  social_insurance_number: string;
  social_insurance_id: number;
  birth_date: string;
  phone_number: string;
  is_alive: boolean;
  email: string;
  country: string;
  city: string;
  street: string;
  created_by_id: number;
  created_at: Date;
  updated_at: Date;

  constructor(partial: Partial<PatientEntity>) {
    Object.assign(this, partial);
  }
}
