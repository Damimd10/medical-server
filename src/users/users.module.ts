import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';

import { UsersController } from './users.controller';
import { userProviders } from './users.providers';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  exports: [UsersService],
  imports: [DatabaseModule],
  providers: [UsersService, ...userProviders],
})
export class UsersModule {}
