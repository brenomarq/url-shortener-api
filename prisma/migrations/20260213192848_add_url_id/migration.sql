/*
  Warnings:

  - The primary key for the `urls` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `shortCode` on the `urls` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[short_code]` on the table `urls` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `urls` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `short_code` to the `urls` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "urls" DROP CONSTRAINT "urls_pkey",
DROP COLUMN "shortCode",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "short_code" TEXT NOT NULL,
ADD CONSTRAINT "urls_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "urls_short_code_key" ON "urls"("short_code");
