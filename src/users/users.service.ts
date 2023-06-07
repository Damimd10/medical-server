import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from '../auth/entities';
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

  async create(username: string, password: string): Promise<User | undefined> {
    const user = new User();

    user.username = username;
    user.password = password;

    const role = new Role();
    role.id = 1;

    user.roles = [role];

    await this.userRepository.save(user);

    return user;
  }
}
