import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../exceptions/UnauthorizedError";
import {
  createUser,
  generateToken,
  getUserByEmail,
  getUserById,
  getUserWithoutPassword,
  hashPassword,
  verifyPassword,
} from "./auth.service";
import { NotFoundError } from "../exceptions/NotFoundError";
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

export const profile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getUserById(req.userId);
    if (!user) {
      throw new NotFoundError();
    }
    return res.status(200).json(getUserWithoutPassword(user));
  } catch (error) {
    next(error);
  }
};
