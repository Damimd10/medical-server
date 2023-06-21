import { Role, User } from '@prisma/client';

export class UserEntity implements User {
  id: number;
  username: string;
  password: string;
  name: string;
  surname: string;
  role: Role;
  refresh_token: string;
  created_at: Date;
  updated_at: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
