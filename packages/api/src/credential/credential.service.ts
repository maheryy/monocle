import crypto from "crypto";
import prisma from "../database";

const APP_PREFIX = "mcl";

/**
 * Generate a random app id.
 * Example: MCL-5D2F3AEQ
 */
export const generatePublicKey = (
  length: number = 8,
  prefix: string = APP_PREFIX
) => {
  const ref = Math.random()
    .toString(36)
    .substring(2, length + 2);
  return `${prefix}-${ref}`.toUpperCase();
};

/**
 * Generate a random app secret.
 * Example: mcl_dGhpcyBpcyBhIHRlc3Qgc2VjcmV0
 */
export const generateSecretKey = (
  length: number = 32,
  prefix: string = APP_PREFIX
) => {
  const secret = crypto.randomBytes(length).toString("base64").slice(0, length);
  return `${prefix}_${secret}`.toLowerCase();
};

export async function getAppId(userId: string) {
  const credentials = await prisma.credential.findUnique({
    where: {
      userId,
    },
  });

  if (!credentials) {
    throw new Error("Credentials not found");
  }

  return credentials.publicKey;
}
