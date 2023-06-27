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
        name: 'Damian',
        surname: 'Diaz',
        role: 'DOCTOR',
      },
      {
        username: 'lucas',
        password: hash,
        name: 'Lucas',
        surname: 'Muller',
        role: 'DOCTOR',
      },
      {
        username: 'maria',
        password: hash,
        name: 'Maria',
        surname: 'Becerra',
        role: 'DOCTOR',
      },
    ],
  });

  const specialitzations = await prisma.speciality.createMany({
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

  const fields = await prisma.field.createMany({
    data: [
      {
        field_id: 'enfermedadCoronaria',
        input_type: 'checkbox',
        label: 'Enf. Coronaria',
        full_name: 'Enfermedad Coronaria',
      },
      {
        field_id: 'hipertensionArterial',
        input_type: 'checkbox',
        label: 'Hipertensión Arterial',
        full_name: 'Hipertensión Arterial',
      },
      {
        field_id: 'diabetes',
        input_type: 'checkbox',
        label: 'Diabetes',
        full_name: 'Diabetes',
      },
    ],
  });

  const appointment = await prisma.appointment.create({
    data: {
      doctor_id: 1,
      patient_id: 1,
      date: new Date(),
      speciality_id: 3,
    },
  });

  const template = await prisma.template.create({
    data: {
      name: 'Infarto de Miocardio',
      template_type: 'Diagnostico',
      specialization_id: specialitzations[0].id,
      alternative_name: ['other-name'],
    },
  });

  await prisma.appointmentField.createMany({
    data: [
      {
        appointment_id: appointment.id,
        field_id: fields[0].id,
        value: 'true',
      },
      {
        appointment_id: appointment.id,
        field_id: fields[1].id,
        value: 'true',
      },
    ],
  });

  await prisma.appointmentTemplate.create({
    data: {
      appointment_id: appointment.id,
      template_id: template.id,
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
