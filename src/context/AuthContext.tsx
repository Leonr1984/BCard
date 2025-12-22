import React, { createContext, useState, useEffect, ReactNode } from "react";
import { User } from "../types";
import { jwtDecode } from "jwt-decode";
import { apiService } from "../services/api";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    phone: string,
    isBusiness: boolean
  ) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isBusiness: boolean;
  isAdmin: boolean;
  setUser: (user: User | null) => void;
  error: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const savedToken = localStorage.getItem("token");

        if (savedToken) {
          try {
            const decoded = jwtDecode<any>(savedToken);

            setToken(savedToken);
            setUser(decoded);
          } catch (decodeError) {
            console.error("Failed to decode token:", decodeError);
            localStorage.removeItem("token");
            setUser(null);
            setToken(null);
          }
        }
      } catch (err) {
        console.error("Auth initialization error:", err);
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      const { token: newToken, user: userData } = await apiService.login({
        email,
        password,
      });

      if (!newToken) {
        throw new Error("No token received from server");
      }

      localStorage.setItem("token", newToken);
      setToken(newToken);
      setUser(userData);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "Login failed";
      setError(errorMessage);
      console.error("Login error:", errorMessage);
      throw err;
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    phone: string,
    isBusiness: boolean
  ) => {
    try {
      setError(null);
      await apiService.register({
        name: {
          first: name.split(" ")[0] || name,
          last: name.split(" ")[1] || "",
          middle: "",
        },
        email,
        password,
        phone,
        isBusiness,
        image: {
          url: "",
          alt: "",
        },
        address: {
          state: "IL",
          country: "Israel",
          city: "Tel Aviv",
          street: "Main Street",
          houseNumber: 1,
          zip: 6000000,
        },
      });

      await login(email, password);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "Registration failed";
      setError(errorMessage);
      console.error("Register error:", errorMessage);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    setError(null);
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!token && !!user,
    isBusiness: user?.isBusiness || false,
    isAdmin: user?.isAdmin || false,
    setUser,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
