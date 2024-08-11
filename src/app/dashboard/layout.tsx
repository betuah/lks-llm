import { AuthWrapper } from "@/providers/authWrapper";

export default function ContentLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return <AuthWrapper>{children}</AuthWrapper>;
}
