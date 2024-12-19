import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import Main from "./(route)/page";

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
        <div>
          <div className="p-4 w-full h-screen flex flex-col items-center justify-center">
            <Main />
          </div>
          {/* <div className="flex min-h-screen">
            <Sidebar />
            <main className="p-4 w-full">
              {children}
            </main>
          </div> */}
        </div>
      </body>
    </html>
  );
}
