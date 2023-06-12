import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('123456', 10);
  await prisma.user.createMany({
    data: [
      {
        username: 'damian',
        password: hash,
        role: 'DOCTOR',
      },
      {
        username: 'lucas',
        password: hash,
        role: 'DOCTOR',
      },
      {
        username: 'maria',
        password: hash,
        role: 'DOCTOR',
      },
    ],
  });

  await prisma.speciality.createMany({
    data: [
      { name: 'Cardiología' },
      { name: 'Dermatología' },
      { name: 'Endocrinología' },
      { name: 'Gastroenterología' },
      { name: 'Ginecología' },
      { name: 'Hematología' },
    ],
  });

  await prisma.socialInsurance.createMany({
    data: [
      { name: 'OSDE' },
      { name: 'Swiss Medical' },
      { name: 'Galeno' },
      { name: 'Medicus' },
      { name: 'Accord Salud' },
    ],
  });

  await prisma.patient.createMany({
    data: [
      {
        createdById: 1,
        name: 'Juan',
        socialInsuranceNumber: '123456',
        socialInsuranceId: 1,
        surname: 'Perez',
      },
      {
        createdById: 1,
        name: 'Pedro',
        socialInsuranceNumber: '123456',
        socialInsuranceId: 1,
        surname: 'Gomez',
      },
      {
        createdById: 1,
        name: 'Maria',
        socialInsuranceNumber: '123456',
        socialInsuranceId: 1,
        surname: 'Gonzalez',
      },
    ],
  });

  await prisma.field.createMany({
    data: [
      {
        fieldId: 'enfermedadCoronaria',
        inputType: 'checkbox',
        label: 'Enf. Coronaria',
        fullName: 'Enfermedad Coronaria',
      },
    ],
  });

  await prisma.appointment.create({
    data: {
      doctorId: 1,
      patientId: 1,
      date: new Date(),
      specialityId: 3,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
