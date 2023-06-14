import { Role, User } from '@prisma/client';

export class UserEntity implements User {
  id: number;
  username: string;
  password: string;
  name: string;
  surname: string;
  role: Role;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
