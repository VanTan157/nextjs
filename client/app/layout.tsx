import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import Header from "@/components/Header";
import { cookies } from "next/headers";
import Provider from "./Provider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get("token");
  return (
    <html lang="en">
      <body className="pt-20">
        <Toaster />
        <Header />
        <Provider token={token?.value as string}>{children}</Provider>
      </body>
    </html>
  );
}
