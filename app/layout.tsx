import type { Metadata } from "next";
import { AuthProvider } from "@/app/providers/AuthProvider";
import { Rubik } from "next/font/google";
import "./globals.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const rubik = Rubik({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Authenticated Todo App",
  description: "A Todo application with authentication features",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rubik.className} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
