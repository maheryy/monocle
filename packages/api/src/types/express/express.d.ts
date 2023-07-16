import { User } from "@prisma/client";

declare global {
  declare namespace Express {
    export interface Request {
      user: Omit<User, "password">;
      appId: string;
    }
  }
}
