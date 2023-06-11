import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('123456', 10);
  await prisma.user.create({
    data: {
      username: 'damian',
      password: hash,
      role: 'DOCTOR',
    },
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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
