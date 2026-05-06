"use client";

import { createContext, useContext, useEffect, useState } from "react";

// ✅ Define user type
type User = {
  name?: string;
  email: string;
};

// ✅ Define context type
type AuthContextType = {
  user: User | null;
  login: (user: User, token: string) => void;
  logout: () => void;
};

// ✅ Create context with undefined (NOT null)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: User, token: string) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ✅ Safe hook
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AppProvider");
  }

  return context;
};