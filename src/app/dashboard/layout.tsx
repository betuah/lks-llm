// import { SessionProvider } from "next-auth/react";

export default function ContentLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <>
         {/* <SessionProvider> */}
            {children}
         {/* </SessionProvider> */}
      </>
   );
}
