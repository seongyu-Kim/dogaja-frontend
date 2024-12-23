import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Navbar from "./components/common/NavBar";
import Sidebar from "./components/common/SideBar";
import Script from "next/script";
import ToastProvider from "@/app/ToastProvider";

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

      <body className={`${font.className} antialiased flex flex-col flex-1`}>
        <Navbar />
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="w-full">
            <ToastProvider />
            {children}
          </main>
        </div>
        <script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services,clusterer`}
        ></script>
      </body>
    </html>
  );
}
