import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
      relations: { roles: true },
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

    user.username = createUserDto.username;
    user.password = createUserDto.password;

    const role = new Role();
    role.id = 1;

    user.roles = [role];

    await this.userRepository.save(user);

    return user;
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, data);

    const user = await this.userRepository.findOne({ where: { id } });

    return user;
  }
}
