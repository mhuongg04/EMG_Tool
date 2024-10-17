-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "hash_value" TEXT NOT NULL,
    "patient_name" TEXT,
    "patient_age" INTEGER,
    "patient_sex" TEXT,
    "date" TEXT,
    "time" TEXT,
    "muscle_name" TEXT,
    "muscle_side" TEXT,
    "amplitude" INTEGER,
    "sampling_frequency" INTEGER,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Record" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "start" INTEGER NOT NULL,
    "end" INTEGER NOT NULL,
    "label_name" TEXT NOT NULL,
    "wave_no" INTEGER NOT NULL,
    "fileId" TEXT NOT NULL,
    "note" TEXT,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "File_hash_value_key" ON "File"("hash_value");

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
