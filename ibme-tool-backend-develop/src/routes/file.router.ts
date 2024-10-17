import { Router } from "express";
import Paths from "../constants/Paths";
import FileController from "../controllers/file.controller";
import authenticateToken from "../middlewares/authentication.middleware";

const fileRouter = Router();

fileRouter.post(
  Paths.File.Upload,
  authenticateToken,
  FileController.uploadFile
);
fileRouter.put(Paths.File.Update, FileController.updateFile);
fileRouter.post(Paths.File.CreateRecord, FileController.createRecord);
fileRouter.get(Paths.File.GetAllRecords, FileController.getAllRecords);
fileRouter.get(
  Paths.File.GetAll,
  authenticateToken,
  FileController.getAllFiles
);
fileRouter.put(
  Paths.File.UpdateManyRecords,
  authenticateToken,
  FileController.updateManyRecords
);
fileRouter.get(Paths.File.Get, authenticateToken, FileController.getFile);
fileRouter.delete(
  Paths.File.Delete,
  authenticateToken,
  FileController.deleteFile
);

fileRouter.post(Paths.File.SearchByStatus, authenticateToken, FileController.getFilesByCondition);
fileRouter.post(Paths.File.SearchByName, authenticateToken, FileController.getFilesByName);

export default fileRouter;
