import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';

import { AccessTokenGuard } from 'src/auth/guards';

import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@UseGuards(AccessTokenGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(+id, updateUserDto);
  }
}
