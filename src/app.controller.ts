import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Roles } from './auth/decorators';
import { JwtAuthGuard, RolesGuard } from './auth/guards';
import { ERole } from './auth/role.enum';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private userService: UsersService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Get('api/test/profile')
  async getProfile(@Request() req) {
    const user = await this.userService.getProfile(req.user.username);
    return req.user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Admin)
  @Get('api/test/user')
  getProtected() {
    return 'protected data';
  }
}
