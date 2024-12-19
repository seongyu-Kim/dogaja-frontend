import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Navbar from './components/common/Navbar';

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
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
