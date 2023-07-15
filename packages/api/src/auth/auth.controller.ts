import { NextFunction, Request, Response } from "express";
import {
  createUser,
  generateToken,
  getUserByEmail,
  hashPassword,
  verifyPassword,
} from "./auth.service";
import { BadRequestError } from "../exceptions/BadRequestError";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);
    if (!user) {
      throw new BadRequestError("Invalid email or password");
    }

    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      throw new BadRequestError("Invalid email or password");
    }

    const token = await generateToken({ userId: user.id });
    return res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    if (await getUserByEmail(email)) {
      throw new BadRequestError("Email already exists");
    }

    const hashedPassword = await hashPassword(password);
    const user = await createUser({
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });

    const token = await generateToken({ userId: user.id });
    return res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

export const profile = async (req: Request, res: Response) => {
  return res.status(200).json(req.user);
};