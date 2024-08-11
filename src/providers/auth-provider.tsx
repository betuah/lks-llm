"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
   name: string;
   email: string;
};

type AuthContextType = {
   user: User | null;
   isLoading: boolean;
   login: (accessToken: string, user: User) => void;
   logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
   const [user, setUser] = useState<User | null>(null);
   const [isLoading, setIsLoading] = useState(true);
   const router = useRouter();

   useEffect(() => {
      const checkAuth = async () => {
         try {
            const accessToken = localStorage.getItem("accessToken");
            const storedUser = localStorage.getItem("user");
            if (!accessToken || !storedUser) {
               setUser(null);
               setIsLoading(false);
               return;
            }

            alert(accessToken)

            const response = await fetch("/api/check", {
               headers: {
                  Authorization: `Bearer ${accessToken}`,
               },
               method: "GET",
            });

            if (response.ok) {
               const data = await response.json();
               if (data.isAuthenticated) {
                  setUser(JSON.parse(storedUser));
               } else {
                  setUser(null);
                  localStorage.removeItem("accessToken");
                  localStorage.removeItem("user");
               }
            } else {
               setUser(null);
               localStorage.removeItem("accessToken");
               localStorage.removeItem("user");
            }
         } catch (error) {
            console.error("Auth check failed:", error);
            setUser(null);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
         } finally {
            setIsLoading(false);
         }
      };

      checkAuth();
   }, []);

   const login = (accessToken: string, userData: User) => {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
   };

   const logout = async () => {
      try {
         await fetch("/api/signout", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ refreshToken: localStorage.getItem("refreshToken") }),
      });
         localStorage.removeItem("accessToken");
         localStorage.removeItem("user");
         setUser(null);
         router.push("/login");
      } catch (error) {
         console.error("Logout failed:", error);
      }
   };

   return (
      <AuthContext.Provider value={{ user, isLoading, login, logout }}>
         {children}
      </AuthContext.Provider>
   );
}

export function useAuth() {
   const context = useContext(AuthContext);
   if (context === undefined) {
      throw new Error("useAuth must be used within an AuthProvider");
   }
   return context;
}
