-- CreateTable
CREATE TABLE "public"."Link" (
    "id" TEXT NOT NULL,
    "original" TEXT NOT NULL,
    "shortedCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Link_shortedCode_key" ON "public"."Link"("shortedCode");
