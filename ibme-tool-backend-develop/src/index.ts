import express, { Express } from "express";
import methodOverride from "method-override";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";

import BaseRouter from "./routes";
import Paths from "./constants/Paths";
import logger from "./configs/logger";
import { errorHandler } from "./middlewares/error-global.middleware";

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(methodOverride("_method"));
app.use(cookieParser());

// log all requests
app.use(morgan("tiny"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());

// Add APIs, must be after middleware
app.use(Paths.Base, BaseRouter);

app.use(errorHandler);

app.listen(port, () => {
  logger.info(`[server]: Server is running at http://localhost:${port}`);
});
