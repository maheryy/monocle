import { sign, verify } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JwtPayload, TRegisterData } from "./auth.interface";
import { UnauthorizedError } from "../exceptions/UnauthorizedError";
import prisma from "../database";
import { User } from "@prisma/client";

export const getUserById = async (id: string) => {
  return prisma.user.findUnique({ where: { id } });
};

export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

export const createUser = async (user: TRegisterData) => {
  return prisma.user.create({ data: user });
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
