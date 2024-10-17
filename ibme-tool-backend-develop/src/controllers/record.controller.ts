import { Request, Response } from "express";
import logger from "../configs/logger";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import RecordRepository from "../repositories/record.repository";
import { RecordDto } from "../types/RecordDto.type";

const RecordController = {
  async getRecord(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const record = await RecordRepository.findById(id);
      return res.status(HttpStatusCodes.OK).json({ record });
    } catch (error) {
      logger.error(`Get record failed!, message is ${error}`);
      return res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Get record failed!" });
    }
  },

  async createRecord(req: Request, res: Response) {
    const fileId = req.params.id;// Lấy ID file từ params
    const recordBody: RecordDto = req.body;

    try {
      const newRecord = await RecordRepository.save(recordBody, fileId);
      return res.status(HttpStatusCodes.CREATED).json({ newRecord });
    } catch (error) {
      logger.error(`Create record failed!, message is ${error}`);
      return res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Create record failed!" });
    }
  },

  async updateRecord(req: Request, res: Response) {
    const { id } = req.params;
    const recordBody: RecordDto = req.body;

    try {
      const updatedRecord = await RecordRepository.update(id, recordBody);
      return res.status(HttpStatusCodes.OK).json({ updatedRecord });
    } catch (error) {
      logger.error(`Updated record failed!, message is ${error}`);
      return res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Updated record failed!" });
    }
  },


  async deleteRecord(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await RecordRepository.deleteById(id);
      return res.status(HttpStatusCodes.NO_CONTENT).json();
    } catch (error) {
      logger.error(`Delete record failed!, message is ${error}`);
      return res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Delete record failed!" });
    }
  },

  async getRecords(req: Request, res: Response) {
    const { fileId, wave_no } = req.params;
    console.log(`Received fileId: ${fileId}, wave_no: ${wave_no}`);

    if (!fileId || !wave_no) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({ message: 'ID and wave_no are required' });
    }

    try {
      const records = await RecordRepository.findByIdAndWaveNo(fileId, parseInt(wave_no));
      console.log(wave_no);

      // Trả về mảng rỗng nếu không có bản ghi nào
      return res.json({ records: records.length > 0 ? records : [] });

    } catch (error) {
      logger.error(`Error fetching records: ${error}`);
      return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching records' });
    }
  },
};

export default RecordController;
