import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { UpdateSpecialityDto } from './dto/update-speciality.dto';
import { Speciality } from './entities/speciality.entity';

@Injectable()
export class SpecialitiesService {
  constructor(
    @InjectRepository(Speciality)
    private specialityRepository: Repository<Speciality>,
  ) {}

  async create(createSpecialityDto: CreateSpecialityDto): Promise<Speciality> {
    return this.specialityRepository.save(createSpecialityDto);
  }

  async findAll(): Promise<Speciality[]> {
    return this.specialityRepository.find();
  }

  async findOne(id: number): Promise<Speciality> {
    return this.specialityRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateSpecialityDto: UpdateSpecialityDto,
  ): Promise<Speciality> {
    await this.specialityRepository.update(id, updateSpecialityDto);

    return this.specialityRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.specialityRepository.delete(id);
  }
}
