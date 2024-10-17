import { Router } from "express";
import Paths from "../constants/Paths";
import RecordController from "../controllers/record.controller";

const recordRouter = Router();

recordRouter.put(Paths.Record.Update, RecordController.updateRecord);
recordRouter.delete(Paths.Record.Delete, RecordController.deleteRecord);
recordRouter.get(Paths.Record.Get, RecordController.getRecord);
recordRouter.post(Paths.Record.GetByIdAndWaveNo, RecordController.getRecords);

export default recordRouter;