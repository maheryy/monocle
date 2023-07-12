import { useState, createContext, useEffect } from "react";
import { remove, retrieve, store } from "@/utils/storage";
import { StorageKey } from "@/types/storage";

export const AuthContext = createContext<AuthContextProps>(null!);

const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState(null); // todo: set user type
	const [token, setToken] = useState(null); // todo: set token type
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const localToken = retrieve<string>(StorageKey.TOKEN);

		if (!localToken) {
			return setIsLoading(false);
		}

		/* TODO: implement authentication
		getUser(localToken)
				.then((user) => authenticate(user, localToken))
				.catch((e: unknown) => {
						invalidate();
						console.error((e as Error).message);
				})
				.finally(() => setIsLoading(false));
		*/
	}, []);

	const authenticate = (user: string, token: string) => { // todo: set user type
		store(StorageKey.TOKEN, token);
		setUser(null); // todo: set user
		setToken(null); // todo: set token
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
	user: string | null; // todo: set user type or null
	isAuthenticated: boolean;
	authenticate: (user: string, token: string) => void;
	invalidate: () => void;
}

interface AuthProviderProps {
	children: React.ReactNode;
}

export default AuthProvider;
