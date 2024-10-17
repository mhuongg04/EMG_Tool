import { Request, Response } from "express";
import logger from "../configs/logger";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import { createGetPresignedUrl, createPutPresignedUrl } from "../helpers";
import FileRepository from "../repositories/file.repository";
import RecordRepository from "../repositories/record.repository";
import { FileUploadBodyDto } from "../types/FileDto.type";
import { RecordDto } from "../types/RecordDto.type";

const FileController = {
  async getFile(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const file = await FileRepository.findById(id);
      const signedUrl = await createGetPresignedUrl(file?.id);
      return res.status(HttpStatusCodes.OK).json({ file, signedUrl });
    } catch (error) {
      logger.error(`Get file failed!, message is ${error}`);
      return res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Get file failed!" });
    }
  },

  async getAllFiles(req: Request, res: Response) {
    const userId = res.locals.user.id;
    console.log(userId);

    try {
      const files = await FileRepository.getFiles(userId);
      return res.status(HttpStatusCodes.OK).json({ files });
    } catch (error) {
      logger.error(`Get files failed!, message is ${error}`);
      return res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Get files failed!" });
    }
  },

  // async searchFile(req: Request, res: Response) {
  //   const name = req.query.name as string; // Lấy tên từ query parameter
  //   if (!name) {
  //     return res.status(400).json({ message: 'Name parameter is required.' });
  //   }

  //   try {
  //     const files = await FileRepository.findByName(name); // Tìm kiếm file theo tên
  //     return res.status(200).json(files);
  //   } catch (error) {
  //     console.error('Get file failed!', error);
  //     return res.status(500).json({ message: 'Get file failed!' });
  //   }
  // },

  async getFilesByName(req: Request, res: Response) {
    const { name } = req.body

    console.log('Name:', name);

    try {
      const files = await FileRepository.findByName(name);
      res.status(200).json({ files });
    } catch (error) {
      console.error('Error fetching files:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }

  },

  async getFilesByCondition(req: Request, res: Response) {

    const { status } = req.body;

    if (!status) {
      console.log('Status is undefined or not provided in the query parameters.');
    } else {
      console.log('Status:', status);
    }

    try {
      const files = await FileRepository.findByStatus(status);
      res.status(200).json({ files });
    } catch (error) {
      console.error('Error fetching files:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }

  },


  async uploadFile(req: Request, res: Response) {
    const fileUploadBody: FileUploadBodyDto = req.body;

    const userId = res.locals.user.id;
    fileUploadBody.userId = userId;
    console.log(fileUploadBody.hash_value);
    console.log(fileUploadBody.patient_name);
    console.log(fileUploadBody)

    try {
      const existFile = await FileRepository.findByHashValueAndUser(
        fileUploadBody.hash_value,
        userId
      );
      if (existFile) {
        return res
          .status(HttpStatusCodes.CREATED)
          .json({ file: existFile, signedUrl: null });
      }
      const file = await FileRepository.saveFile(fileUploadBody);
      const signedUrl = await createPutPresignedUrl(file.id);
      return res.status(HttpStatusCodes.CREATED).json({ file, signedUrl });
    } catch (error) {
      logger.error(`Created file failed!, message is ${error}`);
      return res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Created file failed!" });
    }
  },

  async updateFile(req: Request, res: Response) {
    const { id } = req.params;
    const fileUploadBody: FileUploadBodyDto = req.body;

    try {
      const updatedFile = await FileRepository.updateFile(id, fileUploadBody);
      return res.status(HttpStatusCodes.OK).json({ updatedFile });
    } catch (error) {
      logger.error(`Updated file failed!, message is ${error}`);
      return res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Updated file failed!" });
    }
  },

  async createRecord(req: Request, res: Response) {
    const recordBody: RecordDto = req.body;
    const { id } = req.params;

    try {
      const record = await RecordRepository.save(recordBody, id);
      return res.status(HttpStatusCodes.CREATED).json({ record });
    } catch (error) {
      logger.error(`Created record failed!, message is ${error}`);
      return res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Created record failed!" });
    }
  },

  async getAllRecords(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const file = await FileRepository.findById(id);
      return res.status(HttpStatusCodes.OK).json({ records: file?.records });
    } catch (error) {
      logger.error(`Get records failed!, message is ${error}`);
      return res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Get records failed!" });
    }
  },

  async updateManyRecords(req: Request, res: Response) {
    const { id } = req.params;
    const { records, waveNo } = req.body;

    try {
      await FileRepository.updateManyRecords(id, records, waveNo);
      return res
        .status(HttpStatusCodes.OK)
        .json({ message: "Updated records!" });
    } catch (error) {
      logger.error(`Updated records failed!, message is ${error}`);
      return res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Updated records failed!" });
    }
  },

  async deleteFile(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const deletedFile = await FileRepository.deleteFile(id);

      if (!deletedFile) {
        return res
          .status(HttpStatusCodes.NOT_FOUND)
          .json({ message: "File not found!" });
      }

      return res.status(HttpStatusCodes.NO_CONTENT).send(); // Trả về 204 No Content khi xóa thành công
    } catch (error) {
      logger.error(`Delete file failed!, message is ${error}`);
      return res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Delete file failed!" });
    }
  }
};

export default FileController;
