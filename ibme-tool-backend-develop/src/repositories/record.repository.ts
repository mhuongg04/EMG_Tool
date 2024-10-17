import prisma from "../configs/prisma";
import { RecordDto } from "../types/RecordDto.type";

const RecordRepository = {
  async findById(id: string) {
    return prisma.record.findUnique({
      where: { id },
    });
  },

  async findByIdAndWaveNo(fileId: string, wave_no: number) {
    return await prisma.record.findMany({
      where: {
        fileId: fileId,
        wave_no: wave_no
      }
    });
  },

  async save(recordBody: RecordDto, fileId: string) {
    return prisma.record.create({
      data: {
        ...recordBody,
        file: {
          connect: { id: fileId },
        },
      },
    });
  },

  async update(id: string, recordBody: RecordDto) {
    return prisma.record.update({
      where: { id },
      data: recordBody,
    });
  },

  async deleteById(id: string) {
    return prisma.record.delete({
      where: { id },
    });
  },
};

export default RecordRepository;
