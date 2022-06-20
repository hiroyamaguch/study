import { createContext, useCallback, useState, useContext, ReactNode, useEffect } from 'react';
import Login from '../pages/login';
import { api } from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthData {
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface IAuthProvider {
  children: ReactNode;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [data, setData] = useState<AuthData>(() => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('@UrFood:user');

      if (user) {
        return { user: JSON.parse(user) };
      }
    }
    return {} as AuthData;
  });

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post('users/login', {
      email,
      password,
    });

    localStorage.setItem('@UrFood:user', JSON.stringify(response.data));

    setData({ ...response.data });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@UrFood:user');

    setData({} as AuthData);
  }, []);

  useEffect(() => {
    setIsLogged(!!data.user)
  }, [data.user]);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {isLogged ? children : <Login />}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('authContext must be on initialized');
  }

  return context;
}