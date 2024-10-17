import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import UserRepository from "../repositories/user.repository";
import { SignupBodyDto } from "../types/AuthDto.type";

// This file contains a service for handling business logic related to the request and response objects in an Express application.

const AuthController = {
  async signup(req: Request, res: Response) {
    const data: SignupBodyDto = req.body;
    const saltRounds = 10;

    const user = await UserRepository.findUserByUserName(data.username);

    if (user) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        message: "Username already exists",
      });
    }

    const password = data.password;

    bcrypt.hash(password, saltRounds).then(function (hash) {
      // Store hash in your password DB.
      UserRepository.saveUser(data.username, hash).then((savedUser) => {
        const userId = savedUser.id; // Assuming the saved user object has an id property
        const secret = process.env.JWT_SECRET as string;

        const token = jwt.sign({ userId: userId }, secret, {
          expiresIn: "24h",
        });

        return res.status(HttpStatusCodes.CREATED).json({
          message: "User created successfully",
          accessToken: token,
        });
      });
    });
  },

  async login(req: Request, res: Response) {
    const data = req.body;

    // Find the user by username
    const user = await UserRepository.findUserByUserName(data.username);

    // If the user is not found, return a 404 (Not Found) status code and a message.
    if (!user) {
      return res
        .status(HttpStatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

    // Compare the password from the request with the hashed password in the database.
    const match = await bcrypt.compare(data.password, user.password);

    // If the passwords do not match, return a 401 (Unauthorized) status code and a message.
    if (!match) {
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid password" });
    }

    // If the passwords match, create a JWT token and return it.
    const secret = process.env.JWT_SECRET as string;
    const userId = user.id;
    const token = jwt.sign({ userId: userId }, secret, {
      expiresIn: "24h",
    });

    return res.status(HttpStatusCodes.OK).json({
      message: "Login successfully!",
      accessToken: token,
    });
  },
};

export default AuthController;
