-- CreateTable
CREATE TABLE "appointment_templates" (
    "appointment_id" INTEGER NOT NULL,
    "template_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "appointment_templates_pkey" PRIMARY KEY ("appointment_id","template_id")
);

-- AddForeignKey
ALTER TABLE "appointment_templates" ADD CONSTRAINT "appointment_templates_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment_templates" ADD CONSTRAINT "appointment_templates_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
