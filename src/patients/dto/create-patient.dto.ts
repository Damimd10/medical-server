export class CreatePatientDto {
  name: string;
  surname: string;
  social_insurance_number: string;
  social_insurance_id: number;
  birth_date?: string;
  phone_number?: string;
  is_alive?: boolean;
  email?: string;
  country?: string;
  city?: string;
  street?: string;
  created_by: number;
}
