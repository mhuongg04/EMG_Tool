/**
 * Router for handling HTTP requests related to the demo functionality.
 */
import { Router } from "express";
import Paths from "../constants/Paths";
import AuthController from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post(Paths.Auth.Login, AuthController.login);
authRouter.post(Paths.Auth.Signup, AuthController.signup);

export default authRouter;
