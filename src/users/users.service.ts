import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Speciality } from 'src/specialities/entities/speciality.entity';
import { Role } from '../auth/entities';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find({
      relations: { roles: true, specialities: true },
    });

    return users;
  }

  async findById(id: number): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { roles: true },
    });

    return user;
  }

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: { roles: true },
    });
    return user;
  }

  async getProfile(username: string): Promise<UserDto | undefined> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      return undefined;
    }

    const userDto = new UserDto();

    userDto.id = user.id;
    userDto.username = user.username;

    return userDto;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    const role = new Role();
    const specialities = [];

    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.name = createUserDto.name;
    user.surname = createUserDto.surname;

    role.id = 1;
    user.roles = [role];

    createUserDto.specialities.forEach((specialityId) => {
      const currentSpeciality = new Speciality();
      currentSpeciality.id = specialityId;
      specialities.push(currentSpeciality);
    });

    user.specialities = specialities;

    await this.userRepository.save(user);

    return user;
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    const { specialities, ...userData } = data;

    const currentUser = await this.userRepository.findOne({ where: { id } });

    const updatedSpecialities = specialities.map((specialityId) => {
      const speciality = new Speciality();
      speciality.id = specialityId;
      return speciality;
    });

    await this.userRepository.save({
      ...currentUser,
      ...userData,
      specialities: updatedSpecialities,
    });

    const user = this.userRepository.findOne({ where: { id } });

    return user;
  }
}
