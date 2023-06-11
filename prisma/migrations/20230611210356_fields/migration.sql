-- CreateTable
CREATE TABLE "Field" (
    "id" SERIAL NOT NULL,
    "fieldId" TEXT NOT NULL,
    "inputType" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "defaultValue" TEXT,
    "alternativeName" TEXT[],
    "fullName" TEXT NOT NULL,
    "rightLabel" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Field_pkey" PRIMARY KEY ("id")
);
