import { Controller, Get, UseGuards } from '@nestjs/common';

import { AccessTokenGuard } from 'src/auth/guards';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @UseGuards(AccessTokenGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
