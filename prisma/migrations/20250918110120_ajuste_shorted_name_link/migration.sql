/*
  Warnings:

  - A unique constraint covering the columns `[shortedNameLink]` on the table `Link` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Link" ADD COLUMN     "shortedNameLink" TEXT NOT NULL DEFAULT 'sem_nome';

-- CreateIndex
CREATE UNIQUE INDEX "Link_shortedNameLink_key" ON "public"."Link"("shortedNameLink");
