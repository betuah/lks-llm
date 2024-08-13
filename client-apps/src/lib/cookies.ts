import { cookies } from "next/headers";
import { sealData, unsealData } from "iron-session";

const MAX_AGE = 30 * 24 * 60 * 60; // 30 days

const sealOptions = {
   password: process.env.AUTH_SECRET!,
};

async function encryptData(data: any): Promise<string> {
   return sealData(data, sealOptions);
}

async function decryptData(sealedData: string): Promise<any> {
   return unsealData(sealedData, sealOptions);
}

export async function setRefreshTokenCookie(token: string) {
   const encryptedToken = await encryptData(token);
   cookies().set('session_cookies', encryptedToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: MAX_AGE,
      path: "/",
   });
}

export async function getRefreshTokenFromCookie(): Promise<string | null> {
   const encryptedToken = cookies().get('session_cookies')?.value;
   if (!encryptedToken) return null;
   return decryptData(encryptedToken);
}

export function clearRefreshTokenCookie() {
   cookies().delete('session_cookies');
}

// Fungsi utilitas tambahan untuk enkripsi/dekripsi data umum jika diperlukan
export async function encryptGenericData(data: any): Promise<string> {
   return encryptData(data);
}

export async function decryptGenericData(encryptedData: string): Promise<any> {
   return decryptData(encryptedData);
}
