import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../exceptions/UnauthorizedError";
import {
  createUser,
  generateToken,
  getUserByEmail,
  getUserById,
  verifyPassword,
} from "./auth.service";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedError();
    }

    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedError();
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
    const user = await createUser({
      email,
      password,
      firstName,
      lastName,
    });

    const token = await generateToken({ userId: user.id });
    return res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

export const profile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getUserById(req.userId);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
