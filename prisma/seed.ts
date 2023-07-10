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

  await prisma.organization.createMany({
    data: [
      {
        name: 'Fundación Favaloro',
      },
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
        organization_id: 1,
      },
      {
        created_by_id: 1,
        name: 'Pedro',
        social_insurance_number: '123456',
        social_insurance_id: 1,
        surname: 'Gomez',
        organization_id: 1,
      },
      {
        created_by_id: 1,
        name: 'Maria',
        social_insurance_number: '123456',
        social_insurance_id: 1,
        surname: 'Gonzalez',
        organization_id: 1,
      },
    ],
  });

  const fields = await prisma.field.createMany({
    data: [
      {
        field_id: 'AntecEnfermedadCoronaria',
        input_type: 'checkbox',
        label: 'Enf. Coronaria',
        full_name: 'Enfermedad Coronaria',
        default_section: 'Antecedentes',
      },
      {
        field_id: 'AntecTabaquismo',
        input_type: 'checkbox',
        label: 'TBQ',
        full_name: 'Tabaquismo',
        alternative_name: ['Tabaquista', 'Fumador', 'Tabaco'],
        default_section: 'Antecedentes',
      },
      {
        field_id: 'AntecDiabetes',
        input_type: 'checkbox',
        label: 'DBT',
        full_name: 'Diabetes',
        alternative_name: ['Diabético', 'Diabética', 'Diabetes Mellitus'],
        default_section: 'Antecedentes',
      },
      {
        field_id: 'AntecHipertension',
        input_type: 'checkbox',
        label: 'HTA',
        full_name: 'Hipertensión Arterial',
        alternative_name: ['Hipertensión esencial', 'Hipertenso'],
        default_section: 'Antecedentes',
      },
      {
        field_id: 'AntecArritmia',
        input_type: 'checkbox',
        label: 'Arritmia',
        full_name: 'Arritmia',
        alternative_name: ['Taquicardia', 'Taquiarritmia'],
        default_section: 'Antecedentes',
      },

      {
        field_id: 'AntecInfarto',
        input_type: 'checkbox',
        label: 'IAM',
        full_name: 'Infarto de Miocardio',
        alternative_name: ['IAM', 'Infarto agudo de miocardio'],
        default_section: 'Antecedentes',
      },

      {
        field_id: 'AntecInsuficienciaCardiaca',
        input_type: 'checkbox',
        label: 'Insuficiencia cardíaca',
        full_name: 'Insuficiencia Cardíaca',
        alternative_name: [
          'ICAD',
          'Insuficiencia Cardíaca Aguda',
          'Insuficiencia Cardíaca Crónica',
          'ICC',
          'Insuficiencia Cardíaca Congestiva',
        ],
        default_section: 'Antecedentes',
      },

      {
        field_id: 'AntecCirugiaCardiaca',
        input_type: 'checkbox',
        label: 'Cirugía Cardíaca',
        full_name: 'Cirugía Cardíaca previa',
        alternative_name: ['CRM', 'RVAo', 'RVM', 'PVM', 'Cx cardíaca'],
        default_section: 'Antecedentes',
      },

      {
        field_id: 'AntecDislipidemia',
        input_type: 'checkbox',
        label: 'Dislipidemia',
        full_name: 'Dislipidemia',
        alternative_name: ['Colesterol alto', 'Hipercolesterolemia'],
        default_section: 'Antecedentes',
      },

      {
        field_id: 'AntecObesidad',
        input_type: 'checkbox',
        label: 'Obesidad',
        full_name: 'Obesidad',
        alternative_name: ['Obeso'],
        default_section: 'Antecedentes',
      },

      {
        field_id: 'AntecEnfermedadRenalCronica',
        input_type: 'checkbox',
        label: 'Enf. Renal crónica',
        full_name: 'Enfermedad Renal Crónica',
        alternative_name: ['Insuficiencia Renal'],
        default_section: 'Antecedentes',
      },

      {
        field_id: 'AntecEnfermedadPulmonarCronica',
        input_type: 'checkbox',
        label: 'Enf. Pulmonar crónica',
        full_name: 'Enfermedad Pulmonar Crónica',
        default_section: 'Antecedentes',
      },

      // Examen fisico
      {
        field_id: 'ExamenFisicoFC',
        input_type: 'number',
        label: 'Frec. cardíaca',
        full_name: 'Frecuencia Cardíaca',
        default_section: 'Examen Físico',
      },
      {
        field_id: 'ExamenFisicoTAS',
        input_type: 'number',
        label: 'TA sistólica',
        full_name: 'Tensión arterial sistólica',
        default_section: 'Examen Físico',
      },
      {
        field_id: 'ExamenFisicoTAD',
        input_type: 'number',
        label: 'TA diastólica',
        full_name: 'Tensión arterial diastólica',
        default_section: 'Examen Físico',
      },
      {
        field_id: 'ExamenFisicoFR',
        input_type: 'number',
        label: 'Frec. respiratoria',
        full_name: 'Frecuencia respiratoria',
        default_section: 'Examen Físico',
      },
      {
        field_id: 'ExamenFisicoPeso',
        input_type: 'number',
        label: 'Peso',
        full_name: 'Peso',
        default_section: 'Examen Físico',
      },
      {
        field_id: 'ExamenFisicoTalla',
        input_type: 'number',
        label: 'Talla',
        full_name: 'Talla',
        default_section: 'Examen Físico',
      },
      {
        field_id: 'ExamenFisicoIMC',
        input_type: 'number',
        label: 'IMC',
        full_name: 'Índice de Masa Corporal',
        default_section: 'Examen Físico',
      },
      {
        field_id: 'ExamenFisicoPerimetroAbdominal',
        input_type: 'number',
        label: 'Perímetro abdominal',
        full_name: 'Perímetro abdominal',
        default_section: 'Examen Físico',
      },
      {
        field_id: 'ExamenFisicoEdemasMMII',
        input_type: 'dropdown',
        choices: ['1/6', '2/6', '3/6', '4/6', '5/6', '6/6'],
        label: 'Edemas MMII',
        full_name: 'Edemas miembros inferiores',
        default_section: 'Examen Físico',
      },
      {
        field_id: 'EstudiosECG',
        input_type: 'text',
        label: 'ECG',
        full_name: 'Electrocardiograma',
        default_section: 'Estudios complementarios',
      },
      {
        field_id: 'EstudiosEcocardiograma',
        input_type: 'text',
        label: 'Ecocardiograma',
        full_name: 'Ecocardiograma',
        default_section: 'Estudios complementarios',
      },
      {
        field_id: 'EstudiosRxToraxFrente',
        input_type: 'text',
        label: 'Rx Torax',
        full_name: 'Radiografía de tórax frente',
        alternative_name: [
          'Rx de torax',
          'Placa de torax',
          'Radiografía de torax',
        ],
        default_section: 'Estudios complementarios',
      },
      {
        field_id: 'EstudiosLaboratorio',
        input_type: 'text',
        label: 'Laboratorio',
        full_name: 'Laboratorio',
        alternative_name: [
          'Análisis de laboratorio',
          'Labo',
          'Resultados de laboratorio',
        ],
        default_section: 'Estudios complementarios',
      },
    ],
  });

  await prisma.template.createMany({
    data: [
      {
        name: 'Infarto de miocardio',
        specialization_id: 1,
      },
      { name: 'Tromboembolismo pulmonar', specialization_id: 1 },
    ],
  });

  await prisma.fieldsOnTemplates.createMany({
    data: [
      {
        template_id: 1,
        field_id: 1,
      },
      {
        template_id: 1,
        field_id: 2,
      },
      {
        template_id: 1,
        field_id: 3,
      },
      { template_id: 1, field_id: 4 },
      { template_id: 1, field_id: 5 },
      { template_id: 1, field_id: 6 },
      { template_id: 1, field_id: 8 },
      { template_id: 1, field_id: 9 },
      { template_id: 1, field_id: 10 },
      { template_id: 1, field_id: 11 },
      { template_id: 1, field_id: 12 },
      { template_id: 1, field_id: 13 },
      { template_id: 1, field_id: 14 },
      { template_id: 1, field_id: 15 },
      { template_id: 1, field_id: 16 },
      { template_id: 1, field_id: 17 },
      { template_id: 1, field_id: 18 },
      { template_id: 1, field_id: 19 },
      { template_id: 1, field_id: 20 },
      { template_id: 1, field_id: 21 },
      { template_id: 1, field_id: 22 },
      { template_id: 1, field_id: 23 },
      { template_id: 1, field_id: 24 },
      { template_id: 2, field_id: 1 },
      { template_id: 2, field_id: 2 },
      { template_id: 2, field_id: 3 },
      { template_id: 2, field_id: 7 },
      { template_id: 2, field_id: 8 },
      { template_id: 2, field_id: 9 },
      { template_id: 2, field_id: 10 },
      { template_id: 2, field_id: 11 },
      { template_id: 2, field_id: 12 },
      { template_id: 2, field_id: 13 },
      { template_id: 2, field_id: 14 },
      { template_id: 2, field_id: 15 },
      { template_id: 2, field_id: 16 },
      { template_id: 2, field_id: 17 },
      { template_id: 2, field_id: 18 },
      { template_id: 2, field_id: 19 },
      { template_id: 2, field_id: 20 },
      { template_id: 2, field_id: 21 },
      { template_id: 2, field_id: 22 },
      { template_id: 2, field_id: 23 },
      { template_id: 2, field_id: 24 },
    ],
  });

  const appointment = await prisma.appointment.create({
    data: {
      doctor_id: 1,
      patient_id: 1,
      date: new Date(),
      speciality_id: 3,
      organization_id: 1,
    },
  });

  await prisma.appointmentField.createMany({
    data: [
      {
        appointment_id: appointment.id,
        field_id: 1,
        value: 'true',
      },
      {
        appointment_id: appointment.id,
        field_id: 2,
        value: 'true',
      },
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
