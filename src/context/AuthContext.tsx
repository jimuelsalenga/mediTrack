import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "admin" | "staff" | "student";

interface User {
  email: string;
  name: string;
  role: UserRole;
  studentId?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const MOCK_USERS: Record<string, { password: string; name: string; role: UserRole; studentId?: string }> = {
  "admin@neu.edu.ph": { password: "admin123", name: "Dr. Sarah Chen", role: "admin" },
  "student@neu.edu.ph": { password: "student123", name: "Maya Bennett", role: "student", studentId: "23-00000-000" },
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("meditrack_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string, password: string): boolean => {
    const entry = MOCK_USERS[email.toLowerCase().trim()];
    if (entry && entry.password === password) {
      const u: User = {
        email: email.toLowerCase().trim(),
        name: entry.name,
        role: entry.role,
        studentId: entry.studentId,
      };
      setUser(u);
      localStorage.setItem("meditrack_user", JSON.stringify(u));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("meditrack_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
