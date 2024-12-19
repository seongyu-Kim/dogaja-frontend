import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Navbar from "./components/common/Navbar";
import Sidebar from "./components/common/Sidebar";

const font = localFont({ src: "./fonts/Paperlogy-6SemiBold.ttf" });

export const metadata: Metadata = {
  title: "Do가자",
  description: "여행플래너, Do가자",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex flex-col flex-1">
        <Navbar />
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="p-4 w-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
