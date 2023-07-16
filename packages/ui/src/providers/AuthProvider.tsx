import { useState, createContext, useEffect } from "react";
import { remove, retrieve, store } from "@/utils/storage";
import { StorageKey } from "@/types/storage";
import { getUser } from "@/api/user.api";
import { TUser } from "@/types/user";

export const AuthContext = createContext<AuthContextProps>(null!);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const localToken = retrieve<string>(StorageKey.TOKEN);

    if (!localToken) {
      return setIsLoading(false);
    }

    getUser(localToken)
      .then((user) => authenticate(user, localToken))
      .catch((e: unknown) => {
        invalidate();
        console.error((e as Error).message);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const authenticate = (user: TUser, token: string) => {
    store(StorageKey.TOKEN, token);
    setUser(user);
    setToken(token);
    setIsAuthenticated(true);
  };

  const invalidate = () => {
    remove(StorageKey.TOKEN);
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        authenticate,
        invalidate,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

interface AuthContextProps {
  token: string | null;
  user: TUser | null;
  isAuthenticated: boolean;
  authenticate: (user: TUser, token: string) => void;
  invalidate: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export default AuthProvider;
