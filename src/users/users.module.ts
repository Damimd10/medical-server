import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Role } from 'src/auth/entities';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  exports: [TypeOrmModule, UsersService],
  imports: [TypeOrmModule.forFeature([Role, User])],
  providers: [UsersService],
})
export class UsersModule {}
