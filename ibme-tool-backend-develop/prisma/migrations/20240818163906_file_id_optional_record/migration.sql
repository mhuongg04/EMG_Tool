-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_fileId_fkey";

-- AlterTable
ALTER TABLE "Record" ALTER COLUMN "fileId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;
