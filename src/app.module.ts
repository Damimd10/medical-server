import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DoctorsModule } from './doctors/doctors.module';
import { PatientsModule } from './patients/patients.module';
import { SocialInsurancesModule } from './social-insurances/social-insurances.module';
import { SpecialitiesModule } from './specialities/specialities.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    DoctorsModule,
    PatientsModule,
    SocialInsurancesModule,
    SpecialitiesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
