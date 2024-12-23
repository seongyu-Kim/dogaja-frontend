"use client";

import "./globals.css";
import localFont from "next/font/local";
import Navbar from "./components/common/Navbar";
import Sidebar from "./components/common/Sidebar";
import Script from "next/script";
import ToastProvider from "@/app/ToastProvider";
import { usePathname } from "next/navigation";

const font = localFont({
  src: "./fonts/Paperlogy-6SemiBold.ttf",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  //등록 경로
  const registeredRoutes = ["/", "/dashboard", "/board/", "/map"];

  const isRegisteredRoute = registeredRoutes.some(
    (route) =>
      route.endsWith("/")
        ? pathname.startsWith(route) // "board/"로 시작하는 모든 경로
        : pathname === route, // 정확히 일치하는 경로
  );

  //미등록 경로
  const isHidden =
    ["/login", "/sign-up", "/reset-password", "/find-password"].includes(
      pathname,
      // ) || !registeredRoutes.includes(pathname);
    ) || !isRegisteredRoute;

  return (
    <html lang="ko">
      <body className={`${font.className} antialiased flex flex-col flex-1`}>
        {!isHidden && <Navbar />}
        <div className="flex min-h-screen mt-16">
          {!isHidden && <Sidebar />}
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
