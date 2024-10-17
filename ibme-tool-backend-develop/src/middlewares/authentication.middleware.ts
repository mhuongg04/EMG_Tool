import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import logger from "../configs/logger";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import UserRepository from "../repositories/user.repository";

async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Get the auth header value
  try {
    const authHeader: any = req.header("authorization");

    const token = authHeader && authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET as Secret;

    if (token == null) return res.sendStatus(HttpStatusCodes.UNAUTHORIZED); // if there isn't any token

    const user: any = jwt.verify(token, secret);

    if (!user) return res.sendStatus(HttpStatusCodes.UNAUTHORIZED);

    const checkUserExist = await UserRepository.findUserById(user.userId);

    if (!checkUserExist) return res.sendStatus(HttpStatusCodes.UNAUTHORIZED);

    res.locals.user = checkUserExist;

    next();
  } catch (error) {
    logger.error(error);
    res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export default authenticateToken;
