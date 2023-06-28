/*
  Warnings:

  - The primary key for the `appointment_fields` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `appointments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `fields` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `fields_on_templates` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `patients` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `social_insurances` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `specialities` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `specialities_on_doctors` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `templates` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `organization_id` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organization_id` to the `patients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organization_admin_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('PLANNED', 'CANCELED', 'STARTED', 'FINISHED');

-- DropForeignKey
ALTER TABLE "appointment_fields" DROP CONSTRAINT "appointment_fields_appointment_id_fkey";

-- DropForeignKey
ALTER TABLE "appointment_fields" DROP CONSTRAINT "appointment_fields_field_id_fkey";

-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_doctor_id_fkey";

-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_patient_id_fkey";

-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_speciality_id_fkey";

-- DropForeignKey
ALTER TABLE "fields_on_templates" DROP CONSTRAINT "fields_on_templates_field_id_fkey";

-- DropForeignKey
ALTER TABLE "fields_on_templates" DROP CONSTRAINT "fields_on_templates_template_id_fkey";

-- DropForeignKey
ALTER TABLE "patients" DROP CONSTRAINT "patients_created_by_id_fkey";

-- DropForeignKey
ALTER TABLE "patients" DROP CONSTRAINT "patients_social_insurance_id_fkey";

-- DropForeignKey
ALTER TABLE "specialities_on_doctors" DROP CONSTRAINT "specialities_on_doctors_speciality_id_fkey";

-- DropForeignKey
ALTER TABLE "specialities_on_doctors" DROP CONSTRAINT "specialities_on_doctors_user_id_fkey";

-- DropForeignKey
ALTER TABLE "templates" DROP CONSTRAINT "templates_specialization_id_fkey";

-- AlterTable
ALTER TABLE "appointment_fields" DROP CONSTRAINT "appointment_fields_pkey",
ALTER COLUMN "appointment_id" SET DATA TYPE TEXT,
ALTER COLUMN "field_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "appointment_fields_pkey" PRIMARY KEY ("appointment_id", "field_id");

-- AlterTable
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_pkey",
ADD COLUMN     "organization_id" TEXT NOT NULL,
ADD COLUMN     "status" "AppointmentStatus" NOT NULL DEFAULT 'PLANNED',
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "patient_id" SET DATA TYPE TEXT,
ALTER COLUMN "doctor_id" SET DATA TYPE TEXT,
ALTER COLUMN "speciality_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "appointments_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "appointments_id_seq";

-- AlterTable
ALTER TABLE "fields" DROP CONSTRAINT "fields_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "full_name" DROP NOT NULL,
ADD CONSTRAINT "fields_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "fields_id_seq";

-- AlterTable
ALTER TABLE "fields_on_templates" DROP CONSTRAINT "fields_on_templates_pkey",
ALTER COLUMN "template_id" SET DATA TYPE TEXT,
ALTER COLUMN "field_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "fields_on_templates_pkey" PRIMARY KEY ("template_id", "field_id");

-- AlterTable
ALTER TABLE "patients" DROP CONSTRAINT "patients_pkey",
ADD COLUMN     "clinical_history" TEXT,
ADD COLUMN     "organization_id" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "created_by_id" SET DATA TYPE TEXT,
ALTER COLUMN "social_insurance_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "patients_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "patients_id_seq";

-- AlterTable
ALTER TABLE "social_insurances" DROP CONSTRAINT "social_insurances_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "social_insurances_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "social_insurances_id_seq";

-- AlterTable
ALTER TABLE "specialities" DROP CONSTRAINT "specialities_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "specialities_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "specialities_id_seq";

-- AlterTable
ALTER TABLE "specialities_on_doctors" DROP CONSTRAINT "specialities_on_doctors_pkey",
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ALTER COLUMN "speciality_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "specialities_on_doctors_pkey" PRIMARY KEY ("user_id", "speciality_id");

-- AlterTable
ALTER TABLE "templates" DROP CONSTRAINT "templates_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "specialization_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "templates_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "templates_id_seq";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ADD COLUMN     "organization_admin_id" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OrganizationToTemplate" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_OrganizationMember" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "organizations_name_key" ON "organizations"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_OrganizationToTemplate_AB_unique" ON "_OrganizationToTemplate"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganizationToTemplate_B_index" ON "_OrganizationToTemplate"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OrganizationMember_AB_unique" ON "_OrganizationMember"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganizationMember_B_index" ON "_OrganizationMember"("B");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_organization_admin_id_fkey" FOREIGN KEY ("organization_admin_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "_OrganizationMember" ADD CONSTRAINT "_OrganizationMember_A_fkey" FOREIGN KEY ("A") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationMember" ADD CONSTRAINT "_OrganizationMember_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
