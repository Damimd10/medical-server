-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_organization_admin_id_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "organization_admin_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_organization_admin_id_fkey" FOREIGN KEY ("organization_admin_id") REFERENCES "organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
