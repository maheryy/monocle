import { sign, verify } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JwtPayload, TRegisterData } from "./auth.interface";
import { UnauthorizedError } from "../exceptions/UnauthorizedError";
import prisma from "../database";
import { User } from "@prisma/client";
import {
  generatePublicKey,
  generateSecretKey,
} from "../credential/credential.service";

export const getUserById = async (id: string) => {
  return prisma.user.findUnique({ where: { id } });
};

export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

export const createUser = async (data: TRegisterData) => {
  let publicKey: string, secretKey: string;

  do {
    publicKey = generatePublicKey();
    secretKey = generateSecretKey();
  } while (
    await prisma.credential.findFirst({
      where: { OR: [{ publicKey }, { secretKey }] },
    })
  );

  const userData = {
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    password: data.password,
  };
  const profileData = {
    company: data.company,
    website: data.website,
    address: data.address,
    kbis: data.kbis,
    phone: data.phone,
  };

  return prisma.user.create({
    data: {
      ...userData,
      profile: { create: { ...profileData } },
      credential: { create: { publicKey, secretKey } },
    },
  });
};

export const generateToken = async (payload: JwtPayload) => {
  const token = sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
  return token;
};

export const verifyToken = async (token: string) => {
  try {
    return verify(token, process.env.JWT_SECRET) as JwtPayload;
  } catch (error) {
    throw new UnauthorizedError("Invalid token");
  }
};

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 10);
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
) => {
  return bcrypt.compare(password, hashedPassword);
};

export const getUserWithoutPassword = (user: User): Omit<User, "password"> => {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
