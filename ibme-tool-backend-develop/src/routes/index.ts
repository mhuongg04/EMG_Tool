import { Router } from "express";
import Paths from "../constants/Paths";
import authRouter from "./auth.router";
import fileRouter from "./file.router";
import recordRouter from "./record.router";

const apiRouter = Router();

apiRouter.use(Paths.Auth.Base, authRouter);
apiRouter.use(Paths.File.Base, fileRouter);
apiRouter.use(Paths.Record.Base, recordRouter);


export default apiRouter;
