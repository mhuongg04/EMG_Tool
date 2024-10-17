/*
  Warnings:

  - Made the column `wave_no` on table `Record` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_fileId_fkey";

-- AlterTable
ALTER TABLE "Record" ALTER COLUMN "wave_no" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;
