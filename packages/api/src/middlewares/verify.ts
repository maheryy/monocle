import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../exceptions/BadRequestError";
import { TBaseBody } from "../common/common.zod";
import prisma from "../database";
import { UnauthorizedError } from "../exceptions/UnauthorizedError";

/**
 * Verify the app identifier and the request signature.
 * Extract the source and secret from the body.
 */
export const verifyApp = async (
  req: AnalyticsRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { source, secret, ...data } = req.body;

    switch (source) {
      case "browser": {
        const isValidApp = await prisma.credential.findUnique({
          where: { publicKey: data.appId },
        });

        if (!isValidApp) {
          throw new UnauthorizedError("Invalid app identifier");
        }
        break;
      }
      case "node": {
        if (!secret) {
          throw new BadRequestError("Missing secret key for node source");
        }

        const isValidApp = await prisma.credential.findUnique({
          where: { publicKey: data.appId, secretKey: secret },
        });

        if (!isValidApp) {
          throw new UnauthorizedError("Invalid app identifier or secret");
        }
        break;
      }
      default:
        throw new BadRequestError("Invalid source");
    }

    (req.body as unknown) = data;
    next();
  } catch (error) {
    next(error);
  }
};

interface AnalyticsRequest extends Request {
  body: Record<string, unknown> & TBaseBody;
}
