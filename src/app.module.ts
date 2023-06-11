import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { PatientsModule } from './patients/patients.module';
import { SocialInsurancesModule } from './social-insurances/social-insurances.module';
import { SpecialitiesModule } from './specialities/specialities.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { FieldsModule } from './fields/fields.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PatientsModule,
    SocialInsurancesModule,
    SpecialitiesModule,
    UsersModule,
    HealthModule,
    PrismaModule,
    AppointmentsModule,
    FieldsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
