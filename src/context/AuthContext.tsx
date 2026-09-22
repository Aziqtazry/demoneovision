"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

export type UserRole = "admin" | "public";

interface User {
  username: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => User | null;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Demo users (replace with real database later)
const DEMO_USERS = [
  { username: "admin", password: "admin123", role: "admin" as UserRole },
  { username: "public", password: "public123", role: "public" as UserRole },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Load user from localStorage on refresh
  useEffect(() => {
    try {
      const saved = localStorage.getItem("flood_user");
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch {
      localStorage.removeItem("flood_user");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (username: string, password: string): User | null => {
    const found = DEMO_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (found) {
      const userData = { username: found.username, role: found.role };
      setUser(userData);
      localStorage.setItem("flood_user", JSON.stringify(userData));
      return userData;
    }
    return null;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("flood_user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
