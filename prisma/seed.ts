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
        created_by_id: 1,
        name: 'Juan',
        social_insurance_number: '123456',
        social_insurance_id: 1,
        surname: 'Perez',
      },
      {
        created_by_id: 1,
        name: 'Pedro',
        social_insurance_number: '123456',
        social_insurance_id: 1,
        surname: 'Gomez',
      },
      {
        created_by_id: 1,
        name: 'Maria',
        social_insurance_number: '123456',
        social_insurance_id: 1,
        surname: 'Gonzalez',
      },
    ],
  });

  await prisma.field.createMany({
    data: [
      {
        field_id: 'enfermedadCoronaria',
        input_type: 'checkbox',
        label: 'Enf. Coronaria',
        full_name: 'Enfermedad Coronaria',
      },
    ],
  });

  await prisma.appointment.create({
    data: {
      doctor_id: 1,
      patient_id: 1,
      date: new Date(),
      speciality_id: 3,
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
