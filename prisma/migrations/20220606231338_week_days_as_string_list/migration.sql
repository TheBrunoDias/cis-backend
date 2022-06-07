-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('PAID', 'AWAITING_PAYMENT', 'CANCELED');

-- CreateEnum
CREATE TYPE "AppointmentType" AS ENUM ('CLINICA_ESCOLA', 'CLINICA_POPULAR');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'SECRETARY', 'TECHNICAL_MANAGER', 'INTERN');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('RG', 'CPF', 'RNA', 'CNH');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "role" "Role" NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interns" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "specialtyId" TEXT NOT NULL,
    "monday" TEXT[],
    "tuesday" TEXT[],
    "wednesday" TEXT[],
    "thursday" TEXT[],
    "friday" TEXT[],
    "saturday" TEXT[],
    "sunday" TEXT[],

    CONSTRAINT "interns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "professionals" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "professionalDocument" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "specialtyId" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "monday" TEXT[],
    "tuesday" TEXT[],
    "wednesday" TEXT[],
    "thursday" TEXT[],
    "friday" TEXT[],
    "saturday" TEXT[],
    "sunday" TEXT[],

    CONSTRAINT "professionals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rooms" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "enabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "specialties" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "healthInsurencePrice" INTEGER NOT NULL,
    "privatePrice" INTEGER NOT NULL,
    "description" TEXT,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "color" TEXT NOT NULL DEFAULT E'#34eb89',

    CONSTRAINT "specialties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "socilName" TEXT,
    "document" TEXT NOT NULL,
    "documentType" "DocumentType" NOT NULL,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "disability" BOOLEAN NOT NULL DEFAULT false,
    "disabilityDescription" TEXT,
    "description" TEXT,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "professionalId" TEXT,

    CONSTRAINT "patients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "type" "AppointmentType" NOT NULL,
    "status" "AppointmentStatus" NOT NULL DEFAULT E'AWAITING_PAYMENT',
    "patientId" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "price" INTEGER NOT NULL,
    "totalPaid" INTEGER NOT NULL,
    "professionalId" TEXT,
    "appointmentPackId" TEXT,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppointmentPack" (
    "id" TEXT NOT NULL,
    "servicePackId" TEXT NOT NULL,

    CONSTRAINT "AppointmentPack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "servicesPack" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "pricePerAppointment" INTEGER NOT NULL,
    "specialtyId" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "servicesPack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpecialtiesInRoom" (
    "roomId" TEXT NOT NULL,
    "specialtyId" TEXT NOT NULL,

    CONSTRAINT "SpecialtiesInRoom_pkey" PRIMARY KEY ("roomId","specialtyId")
);

-- CreateTable
CREATE TABLE "InternsInAppointment" (
    "appointmentId" TEXT NOT NULL,
    "internId" TEXT NOT NULL,

    CONSTRAINT "InternsInAppointment_pkey" PRIMARY KEY ("appointmentId","internId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "interns_studentId_key" ON "interns"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "interns_email_key" ON "interns"("email");

-- CreateIndex
CREATE UNIQUE INDEX "interns_phone_key" ON "interns"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "professionals_professionalDocument_key" ON "professionals"("professionalDocument");

-- CreateIndex
CREATE UNIQUE INDEX "professionals_email_key" ON "professionals"("email");

-- CreateIndex
CREATE UNIQUE INDEX "professionals_phone_key" ON "professionals"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "rooms_name_key" ON "rooms"("name");

-- CreateIndex
CREATE UNIQUE INDEX "specialties_name_key" ON "specialties"("name");

-- CreateIndex
CREATE UNIQUE INDEX "patients_document_key" ON "patients"("document");

-- CreateIndex
CREATE UNIQUE INDEX "patients_phone_key" ON "patients"("phone");

-- AddForeignKey
ALTER TABLE "interns" ADD CONSTRAINT "interns_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "specialties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "professionals" ADD CONSTRAINT "professionals_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "specialties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "professionals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "professionals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_appointmentPackId_fkey" FOREIGN KEY ("appointmentPackId") REFERENCES "AppointmentPack"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentPack" ADD CONSTRAINT "AppointmentPack_servicePackId_fkey" FOREIGN KEY ("servicePackId") REFERENCES "servicesPack"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servicesPack" ADD CONSTRAINT "servicesPack_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "specialties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecialtiesInRoom" ADD CONSTRAINT "SpecialtiesInRoom_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecialtiesInRoom" ADD CONSTRAINT "SpecialtiesInRoom_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "specialties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InternsInAppointment" ADD CONSTRAINT "InternsInAppointment_internId_fkey" FOREIGN KEY ("internId") REFERENCES "interns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InternsInAppointment" ADD CONSTRAINT "InternsInAppointment_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
