import { Injectable } from '@nestjs/common';
import { Role, User } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      include: {
        specialities: {
          include: { speciality: true },
        },
      },
    });

    return users;
  }

  async findById(id: number): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return user;
  }

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { specialities, ...userData } = createUserDto;

    const user = await this.prisma.user.create({
      data: {
        ...userData,
        role: Role.DOCTOR,
        specialities: {
          create: specialities.map((specialityId) => ({
            assignedAt: new Date(),
            speciality: {
              connect: {
                id: specialityId,
              },
            },
          })),
        },
      },
    });

    return user;
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    const { specialities, ...userData } = data;

    const specialitiesData = specialities
      ? {
          specialities: {
            deleteMany: {
              userId: id,
            },
            create: specialities.map((specialityId) => ({
              assignedAt: new Date(),
              speciality: {
                connect: {
                  id: specialityId,
                },
              },
            })),
          },
        }
      : null;

    return this.prisma.user.update({
      include: {
        specialities: {
          include: { speciality: true },
        },
      },
      where: { id },
      data: {
        ...specialitiesData,
        ...userData,
      },
    });
  }
}
