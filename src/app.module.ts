import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SocialInsurancesModule } from './social-insurances/social-insurances.module';

@Module({
  imports: [AuthModule, UsersModule, SocialInsurancesModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
