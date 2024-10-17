import prisma from "../configs/prisma";
import { FileUploadBodyDto } from "../types/FileDto.type";
import { RecordDto } from "../types/RecordDto.type";
import { PrismaClient, Prisma } from '@prisma/client';

const FileRepository = {
  async findById(id: string) {
    return prisma.file.findUnique({
      where: { id },
      include: { records: true },
    });
  },
  async findByHashValueAndUser(hash_value: string, userId: string) {
    return prisma.file.findUnique({
      where: {
        hash_value_userId: {
          hash_value: hash_value,
          userId: userId,
        },
      },
    });
  },

  async findByStatus(status: 'COMPLETED' | 'TO_DO' | 'NEED_REVIEW') {
    const conditions: any[] = [];

    if (status) {
      conditions.push({ status });
    }

    // Truy vấn với Prisma
    return prisma.file.findMany({
      where: {
        AND: conditions,
      },
    });
  },

  async findByName(name: string) {
    const where: Prisma.FileWhereInput = {};

    if (name) {
      where.file_name = {
        contains: name,
        mode: 'insensitive',
      };
    }

    return prisma.file.findMany({
      where,
    });
  },

  async saveFile(fileBody: FileUploadBodyDto) {
    return prisma.file.create({
      data: fileBody,
    });
  },

  async updateFile(id: string, fileBody: FileUploadBodyDto) {
    return prisma.file.update({
      where: { id },
      data: fileBody,
    });
  },

  async getFiles(userId: string) {
    return prisma.file.findMany({
      where: {
        userId,
      },
    });
  },


  async updateManyRecords(id: string, records: RecordDto[], wave_no: number) {
    await prisma.$transaction([
      prisma.record.deleteMany({
        where: {
          fileId: id,
          wave_no,
        },
      }),
      prisma.file.update({
        where: { id },
        data: {
          records: {
            create: records,
          },
        },
      }),
    ]);
  },

  async deleteFile(id: string) {
    return prisma.file.delete({
      where: { id },
    });
  },
};

export default FileRepository;
