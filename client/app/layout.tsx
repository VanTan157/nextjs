import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import Header from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="pt-20">
        <Toaster />
        <Header />
        {children}
      </body>
    </html>
  );
}
