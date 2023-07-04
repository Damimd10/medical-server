-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'DOCTOR', 'USER');

-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('PLANNED', 'CANCELED', 'STARTED', 'FINISHED');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "surname" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "refresh_token" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "organization_admin_id" INTEGER,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "specialities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "specialities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "specialities_on_doctors" (
    "user_id" INTEGER NOT NULL,
    "speciality_id" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "specialities_on_doctors_pkey" PRIMARY KEY ("user_id","speciality_id")
);

-- CreateTable
CREATE TABLE "patients" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "social_insurance_number" TEXT,
    "clinical_history" TEXT,
    "birth_date" TEXT,
    "phone_number" TEXT,
    "is_alive" BOOLEAN NOT NULL DEFAULT true,
    "email" TEXT,
    "country" TEXT,
    "city" TEXT,
    "street" TEXT,
    "created_by_id" INTEGER NOT NULL,
    "social_insurance_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "organization_id" INTEGER NOT NULL,

    CONSTRAINT "patients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_insurances" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "social_insurances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointments" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "patient_id" INTEGER NOT NULL,
    "doctor_id" INTEGER NOT NULL,
    "speciality_id" INTEGER NOT NULL,
    "organization_id" INTEGER NOT NULL,
    "status" "AppointmentStatus" NOT NULL DEFAULT 'PLANNED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fields" (
    "id" SERIAL NOT NULL,
    "field_id" TEXT NOT NULL,
    "input_type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "default_value" TEXT,
    "alternative_name" TEXT[],
    "full_name" TEXT,
    "right_label" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "default_section" TEXT,
    "choices" TEXT[],

    CONSTRAINT "fields_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointment_templates" (
    "appointment_id" INTEGER NOT NULL,
    "template_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "appointment_templates_pkey" PRIMARY KEY ("appointment_id","template_id")
);

-- CreateTable
CREATE TABLE "appointment_fields" (
    "appointment_id" INTEGER NOT NULL,
    "field_id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "appointment_fields_pkey" PRIMARY KEY ("appointment_id","field_id")
);

-- CreateTable
CREATE TABLE "templates" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "alternative_name" TEXT[],
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "specialization_id" INTEGER NOT NULL,

    CONSTRAINT "templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fields_on_templates" (
    "template_id" INTEGER NOT NULL,
    "field_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fields_on_templates_pkey" PRIMARY KEY ("template_id","field_id")
);

-- CreateTable
CREATE TABLE "organizations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OrganizationToTemplate" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_organization_members" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "specialities_name_key" ON "specialities"("name");

-- CreateIndex
CREATE UNIQUE INDEX "social_insurances_name_key" ON "social_insurances"("name");

-- CreateIndex
CREATE UNIQUE INDEX "templates_name_key" ON "templates"("name");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_name_key" ON "organizations"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_OrganizationToTemplate_AB_unique" ON "_OrganizationToTemplate"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganizationToTemplate_B_index" ON "_OrganizationToTemplate"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_organization_members_AB_unique" ON "_organization_members"("A", "B");

-- CreateIndex
CREATE INDEX "_organization_members_B_index" ON "_organization_members"("B");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_organization_admin_id_fkey" FOREIGN KEY ("organization_admin_id") REFERENCES "organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "specialities_on_doctors" ADD CONSTRAINT "specialities_on_doctors_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "specialities_on_doctors" ADD CONSTRAINT "specialities_on_doctors_speciality_id_fkey" FOREIGN KEY ("speciality_id") REFERENCES "specialities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_social_insurance_id_fkey" FOREIGN KEY ("social_insurance_id") REFERENCES "social_insurances"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_speciality_id_fkey" FOREIGN KEY ("speciality_id") REFERENCES "specialities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment_templates" ADD CONSTRAINT "appointment_templates_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment_templates" ADD CONSTRAINT "appointment_templates_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment_fields" ADD CONSTRAINT "appointment_fields_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment_fields" ADD CONSTRAINT "appointment_fields_field_id_fkey" FOREIGN KEY ("field_id") REFERENCES "fields"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "templates" ADD CONSTRAINT "templates_specialization_id_fkey" FOREIGN KEY ("specialization_id") REFERENCES "specialities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fields_on_templates" ADD CONSTRAINT "fields_on_templates_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fields_on_templates" ADD CONSTRAINT "fields_on_templates_field_id_fkey" FOREIGN KEY ("field_id") REFERENCES "fields"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToTemplate" ADD CONSTRAINT "_OrganizationToTemplate_A_fkey" FOREIGN KEY ("A") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToTemplate" ADD CONSTRAINT "_OrganizationToTemplate_B_fkey" FOREIGN KEY ("B") REFERENCES "templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_organization_members" ADD CONSTRAINT "_organization_members_A_fkey" FOREIGN KEY ("A") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_organization_members" ADD CONSTRAINT "_organization_members_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
