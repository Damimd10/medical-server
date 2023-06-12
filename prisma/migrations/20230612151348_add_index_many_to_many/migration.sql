/*
  Warnings:

  - The primary key for the `AppointmentField` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `AppointmentField` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AppointmentField" DROP CONSTRAINT "AppointmentField_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "AppointmentField_pkey" PRIMARY KEY ("appointmentId", "fieldId");
