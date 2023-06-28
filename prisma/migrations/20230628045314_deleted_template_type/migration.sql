/*
  Warnings:

  - You are about to drop the column `template_type` on the `templates` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "templates" DROP COLUMN "template_type",
ADD COLUMN     "description" TEXT;
