/*
  Warnings:

  - The primary key for the `appointment_fields` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `appointments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `appointments` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `fields` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `fields` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `fields_on_templates` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `organizations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `organizations` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `patients` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `patients` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `social_insurances` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `social_insurances` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `specialities` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `specialities` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `specialities_on_doctors` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `templates` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `templates` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `_OrganizationMember` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `A` on the `_OrganizationToTemplate` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `B` on the `_OrganizationToTemplate` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `appointment_id` on the `appointment_fields` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `field_id` on the `appointment_fields` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `patient_id` on the `appointments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `doctor_id` on the `appointments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `speciality_id` on the `appointments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `organization_id` on the `appointments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `template_id` on the `fields_on_templates` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `field_id` on the `fields_on_templates` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `created_by_id` on the `patients` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `social_insurance_id` on the `patients` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `organization_id` on the `patients` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `specialities_on_doctors` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `speciality_id` on the `specialities_on_doctors` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `specialization_id` on the `templates` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `organization_admin_id` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "_OrganizationMember" DROP CONSTRAINT "_OrganizationMember_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrganizationMember" DROP CONSTRAINT "_OrganizationMember_B_fkey";

-- DropForeignKey
ALTER TABLE "_OrganizationToTemplate" DROP CONSTRAINT "_OrganizationToTemplate_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrganizationToTemplate" DROP CONSTRAINT "_OrganizationToTemplate_B_fkey";

-- DropForeignKey
ALTER TABLE "appointment_fields" DROP CONSTRAINT "appointment_fields_appointment_id_fkey";

-- DropForeignKey
ALTER TABLE "appointment_fields" DROP CONSTRAINT "appointment_fields_field_id_fkey";

-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_doctor_id_fkey";

-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_organization_id_fkey";

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
ALTER TABLE "patients" DROP CONSTRAINT "patients_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "patients" DROP CONSTRAINT "patients_social_insurance_id_fkey";

-- DropForeignKey
ALTER TABLE "specialities_on_doctors" DROP CONSTRAINT "specialities_on_doctors_speciality_id_fkey";

-- DropForeignKey
ALTER TABLE "specialities_on_doctors" DROP CONSTRAINT "specialities_on_doctors_user_id_fkey";

-- DropForeignKey
ALTER TABLE "templates" DROP CONSTRAINT "templates_specialization_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_organization_admin_id_fkey";

-- AlterTable
ALTER TABLE "_OrganizationToTemplate" DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL,
DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "appointment_fields" DROP CONSTRAINT "appointment_fields_pkey",
DROP COLUMN "appointment_id",
ADD COLUMN     "appointment_id" INTEGER NOT NULL,
DROP COLUMN "field_id",
ADD COLUMN     "field_id" INTEGER NOT NULL,
ADD CONSTRAINT "appointment_fields_pkey" PRIMARY KEY ("appointment_id", "field_id");

-- AlterTable
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "patient_id",
ADD COLUMN     "patient_id" INTEGER NOT NULL,
DROP COLUMN "doctor_id",
ADD COLUMN     "doctor_id" INTEGER NOT NULL,
DROP COLUMN "speciality_id",
ADD COLUMN     "speciality_id" INTEGER NOT NULL,
DROP COLUMN "organization_id",
ADD COLUMN     "organization_id" INTEGER NOT NULL,
ADD CONSTRAINT "appointments_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "fields" DROP CONSTRAINT "fields_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "fields_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "fields_on_templates" DROP CONSTRAINT "fields_on_templates_pkey",
DROP COLUMN "template_id",
ADD COLUMN     "template_id" INTEGER NOT NULL,
DROP COLUMN "field_id",
ADD COLUMN     "field_id" INTEGER NOT NULL,
ADD CONSTRAINT "fields_on_templates_pkey" PRIMARY KEY ("template_id", "field_id");

-- AlterTable
ALTER TABLE "organizations" DROP CONSTRAINT "organizations_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "organizations_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "patients" DROP CONSTRAINT "patients_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "created_by_id",
ADD COLUMN     "created_by_id" INTEGER NOT NULL,
DROP COLUMN "social_insurance_id",
ADD COLUMN     "social_insurance_id" INTEGER NOT NULL,
DROP COLUMN "organization_id",
ADD COLUMN     "organization_id" INTEGER NOT NULL,
ADD CONSTRAINT "patients_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "social_insurances" DROP CONSTRAINT "social_insurances_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "social_insurances_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "specialities" DROP CONSTRAINT "specialities_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "specialities_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "specialities_on_doctors" DROP CONSTRAINT "specialities_on_doctors_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "user_id" INTEGER NOT NULL,
DROP COLUMN "speciality_id",
ADD COLUMN     "speciality_id" INTEGER NOT NULL,
ADD CONSTRAINT "specialities_on_doctors_pkey" PRIMARY KEY ("user_id", "speciality_id");

-- AlterTable
ALTER TABLE "templates" DROP CONSTRAINT "templates_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "specialization_id",
ADD COLUMN     "specialization_id" INTEGER NOT NULL,
ADD CONSTRAINT "templates_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "organization_admin_id",
ADD COLUMN     "organization_admin_id" INTEGER NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "_OrganizationMember";

-- CreateTable
CREATE TABLE "_organization_members" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_organization_members_AB_unique" ON "_organization_members"("A", "B");

-- CreateIndex
CREATE INDEX "_organization_members_B_index" ON "_organization_members"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OrganizationToTemplate_AB_unique" ON "_OrganizationToTemplate"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganizationToTemplate_B_index" ON "_OrganizationToTemplate"("B");

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
ALTER TABLE "_organization_members" ADD CONSTRAINT "_organization_members_A_fkey" FOREIGN KEY ("A") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_organization_members" ADD CONSTRAINT "_organization_members_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
