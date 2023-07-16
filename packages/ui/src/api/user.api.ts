import api from ".";
import { Token } from "@/types/token";
import { TUser } from "@/types/user";

export const getUser = async (token: string): Promise<TUser> => {
  return api.auth(`Bearer ${token}`).get("/auth/profile").json();
};

export const getAuthToken = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<Token> => {
  return api.post({ email, password }, "/auth/login").json();
};
