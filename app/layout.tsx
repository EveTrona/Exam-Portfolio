import type React from "react";
import "@/app/globals.css";
/* import { Inter } from "next/font/google"; */
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "个人展示网站",
  description: "基于React和WebGL的个人展示网站",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className={"font-nunito"}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
