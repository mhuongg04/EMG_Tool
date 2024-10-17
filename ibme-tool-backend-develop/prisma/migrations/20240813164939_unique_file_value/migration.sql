/*
  Warnings:

  - A unique constraint covering the columns `[hash_value,userId]` on the table `File` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "File_hash_value_key";

-- CreateIndex
CREATE UNIQUE INDEX "File_hash_value_userId_key" ON "File"("hash_value", "userId");
