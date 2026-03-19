-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('pending', 'sent', 'failed');

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "selectedProduct" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "ad" TEXT NOT NULL,
    "soyad" TEXT NOT NULL,
    "telefon" TEXT NOT NULL,
    "email" TEXT,
    "kvkkOnay" BOOLEAN NOT NULL,
    "kvkkAcceptedAt" TIMESTAMP(3),
    "clientIp" TEXT NOT NULL,
    "userAgent" TEXT,
    "notificationStatus" "NotificationStatus" NOT NULL DEFAULT 'pending',
    "notificationError" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Lead_selectedProduct_createdAt_idx" ON "Lead"("selectedProduct", "createdAt");

-- CreateIndex
CREATE INDEX "Lead_notificationStatus_createdAt_idx" ON "Lead"("notificationStatus", "createdAt");
