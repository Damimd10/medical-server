/*
  Warnings:

  - You are about to drop the column `speciality_ud` on the `appointments` table. All the data in the column will be lost.
  - Added the required column `speciality_id` to the `appointments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_speciality_ud_fkey";

-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "speciality_ud",
ADD COLUMN     "speciality_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_speciality_id_fkey" FOREIGN KEY ("speciality_id") REFERENCES "specialities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
