import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../exceptions/UnauthorizedError";
import {
  getUserById,
  getUserWithoutPassword,
  verifyToken,
} from "../auth/auth.service";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw new UnauthorizedError("Authorization header required");
    }

    const [type, token] = authorization.split(/\s+/);
    if (type !== "Bearer") {
      throw new UnauthorizedError("Bearer token required");
    }

    const payload = await verifyToken(token);
    const user = await getUserById(payload.userId);

    if (!user) {
      throw new UnauthorizedError("User can't found");
    }

    req.user = getUserWithoutPassword(user);
    next();
  } catch (error) {
    next(error);
  }
};
