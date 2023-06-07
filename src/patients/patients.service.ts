import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SocialInsurance } from 'src/social-insurances/entities/social-insurance.entity';
import { User } from 'src/users/entities/user.entity';

import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const patient = new Patient();
    const socialInsurance = new SocialInsurance();
    const user = new User();

    patient.name = createPatientDto.name;
    patient.surname = createPatientDto.surname;
    patient.social_insurance_number = createPatientDto.social_insurance_number;
    patient.birth_date = createPatientDto.birth_date;
    patient.phone_number = createPatientDto.phone_number;
    patient.is_alive = createPatientDto.is_alive;
    patient.email = createPatientDto.email;
    patient.country = createPatientDto.country;
    patient.city = createPatientDto.city;
    patient.street = createPatientDto.street;

    socialInsurance.id = createPatientDto.social_insurance_id;
    user.id = createPatientDto.created_by;

    patient.social_insurance = socialInsurance;
    patient.user = user;

    return this.patientRepository.save(patient);
  }

  async findAll(): Promise<Patient[]> {
    return this.patientRepository.find();
  }

  async findOne(id: number): Promise<Patient> {
    return this.patientRepository.findOne({
      relations: { social_insurance: true, user: true },
      where: { id },
    });
  }

  async update(
    id: number,
    updatePatientDto: UpdatePatientDto,
  ): Promise<Patient> {
    await this.patientRepository.update(id, updatePatientDto);

    return this.patientRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.patientRepository.softDelete(id);
  }
}
