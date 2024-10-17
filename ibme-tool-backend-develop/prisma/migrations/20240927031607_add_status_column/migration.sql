/*
  Warnings:

  - Added the required column `status` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('COMPLETED', 'TO_DO', 'NEED_REVIEW');

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "status" "Status" NOT NULL;
