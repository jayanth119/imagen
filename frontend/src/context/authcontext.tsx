import { createContext, useEffect, useState, useContext } from "react";

type User = { id: number; email: string; name: string };

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

const mockUsers = [
  { id: 1, email: 'user@example.com', password: 'password123', name: 'John Doe' }
];

import type { ReactNode } from "react";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user') || 'null');
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      if (foundUser) {
        const userData = { id: foundUser.id, email: foundUser.email, name: foundUser.name };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true };
      } else {
        return { success: false, error: 'Invalid email or password' };
      }
    } catch {
      return { success: false, error: 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: any, name: any) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const existingUser = mockUsers.find(u => u.email === email);
      if (existingUser) {
        return { success: false, error: 'Email already exists' };
      }

      const newUser = { id: Date.now(), email, password, name };
      mockUsers.push(newUser);
      const userData = { id: newUser.id, email: newUser.email, name: newUser.name };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true };
    } catch {
      return { success: false, error: 'Registration failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
