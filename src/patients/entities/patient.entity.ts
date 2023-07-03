import { Patient } from '@prisma/client';
import { OrganizationEntity } from 'src/organizations/entities/organization.entity';

export class PatientEntity implements Patient {
  id: number;
  name: string;
  surname: string;
  social_insurance_number: string;
  social_insurance_id: number;
  clinical_history: string;
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
  organization: OrganizationEntity;
  organization_id: number;

  constructor(partial: Partial<PatientEntity>) {
    Object.assign(this, partial);
  }
}
