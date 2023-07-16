import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../exceptions/UnauthorizedError";
import {
  getUserById,
  getUserWithoutPassword,
  verifyToken,
} from "../auth/auth.service";
import { getAppId } from "../credential/credential.service";

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

    const [user, appId] = await Promise.all([
      getUserById(payload.userId),
      getAppId(payload.userId),
    ]);

    if (!user) {
      throw new UnauthorizedError("User can't be found");
    }

    req.user = getUserWithoutPassword(user);

    req.appId = appId;
    next();
  } catch (error) {
    next(error);
  }
};
