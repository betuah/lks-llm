import { getSession } from "next-auth/react";
import { DefaultSession } from "next-auth";
import { refreshAccessToken } from "@/lib/cognito";

declare module "next-auth" {
   interface Session {
      user: {
         idToken?: string;
         refreshToken?: string;
         accessToken?: string;
         accessTokenExpires?: number;
         idTokenExpires?: number;
         name?: string;
         email?: string;
         id?: string;
      } & DefaultSession["user"];
   }
}

interface CallAPIOptions {
   method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
   body?: any;
   headers?: Record<string, string>;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL || "";

const callAPI = async (
   endpoint: string,
   options: CallAPIOptions = {},
   retryCount = 0
) => {
   let session = await getSession();
   let idToken = session?.user?.idToken;

   if (!idToken) {
      throw new Error(
         "No ID token available. User might not be authenticated."
      );
   }

   const defaultHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
   };

   const fetchOptions: RequestInit = {
      method: options.method || "GET",
      headers: { ...defaultHeaders, ...options.headers },
   };

   if (options.body) {
      fetchOptions.body = JSON.stringify(options.body);
   }

   try {
      const response = await fetch(`${BASE_URL}${endpoint}`, fetchOptions);

      if (response.status === 401 && retryCount < 1) {
         // Token might be expired, try to refresh
         console.log("Token expired, attempting to refresh...");
         const refreshToken = session?.user?.refreshToken;
         if (!refreshToken) {
            throw new Error("No refresh token available");
         }

         try {
            const refreshResult = await refreshAccessToken(refreshToken);
            
            // Update the session object with the new tokens
            if (session && session.user) {
               session.user.idToken = refreshResult.idToken;
               session.user.accessToken = refreshResult.accessToken;
               session.user.accessTokenExpires = refreshResult.expiresIn * 1000 + Date.now();
            }

            // Retry the API call with the new token
            return callAPI(endpoint, {
               ...options,
               headers: {
                  ...options.headers,
                  Authorization: `Bearer ${refreshResult.idToken}`,
               },
            }, retryCount + 1);
         } catch (refreshError) {
            console.error("Failed to refresh token:", refreshError);
            throw new Error("Failed to refresh authentication token");
         }
      }

      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
   } catch (error) {
      console.error("API call failed:", error);
      throw error;
   }
};

export const get = (endpoint: string, options?: CallAPIOptions) =>
   callAPI(endpoint, { ...options, method: "GET" });

export const post = (endpoint: string, body: any, options?: CallAPIOptions) =>
   callAPI(endpoint, { ...options, method: "POST", body });

export const put = (endpoint: string, body: any, options?: CallAPIOptions) =>
   callAPI(endpoint, { ...options, method: "PUT", body });

export const del = (endpoint: string, options?: CallAPIOptions) =>
   callAPI(endpoint, { ...options, method: "DELETE" });

export const patch = (endpoint: string, body: any, options?: CallAPIOptions) =>
   callAPI(endpoint, { ...options, method: "PATCH", body });

export default {
   get,
   post,
   put,
   delete: del,
   patch,
};