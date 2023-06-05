import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SocialInsurancesModule } from './social-insurances/social-insurances.module';
import { DoctorsModule } from './doctors/doctors.module';
import { SpecialitiesModule } from './specialities/specialities.module';

@Module({
  imports: [AuthModule, UsersModule, SocialInsurancesModule, DoctorsModule, SpecialitiesModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
