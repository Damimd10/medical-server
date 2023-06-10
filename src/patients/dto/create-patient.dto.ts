export class CreatePatientDto {
  name: string;
  surname: string;
  socialInsuranceNumber: string;
  socialInsuranceId: number;
  birthDate?: string;
  phoneNumber?: string;
  isAlive?: boolean;
  email?: string;
  country?: string;
  city?: string;
  street?: string;
  createdBy?: number;
}
