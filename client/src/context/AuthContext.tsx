import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/interfaces";
import { useRouter } from "next/navigation";

interface AuthContextProps {
  error?: {
    message?: string;
  } | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => void;
  register: (username: string, password: string) => void;
  logout?: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  error: null,
  isLoading: false,
  isAuthenticated: false,
  user: null,
  login: (username: string, password: string) => {},
  register: (username: string, password: string) => {},
  logout: () => {},
} as AuthContextProps);

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthContextProps["user"] | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<AuthContextProps["error"]>(null);
  const router = useRouter();

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data: { access_token: string }) => {
        if (data.access_token) {
          localStorage.setItem("access_token", data.access_token);
          setIsAuthenticated(true);
          setError(null);

          router.push("/");
        } else {
          setError({ message: "Error while logging in" });
        }
      })
      .catch(() => {
        setError({ message: "Error while checking user" });
        setIsAuthenticated(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const register = async (username: string, password: string) => {
    setIsLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data: User) => {
        if (data.id) {
          setUser(data);
          setIsAuthenticated(true);
          setError(null);
          router.push("/auth/login");
        } else {
          setError({ message: "Error while registering user" });
        }
      })
      .catch(() => {
        setError({ message: "Error while register user" });
        setIsAuthenticated(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const checkUser = async () => {
    setIsLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => response.json())
      .then((data: User) => {
        if (data.id) {
          setUser(data);
          setIsAuthenticated(true);
          setError(null);
        } else {
          setError({ message: "Error while checking user" });
        }
      })
      .catch(() => {
        setError({ message: "Error while checking user" });
        setIsAuthenticated(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setIsAuthenticated(false);
    router.push("/");
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        isAuthenticated,
        isLoading,
        error,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
