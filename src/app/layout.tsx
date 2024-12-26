"use client";

import "./globals.css";
import localFont from "next/font/local";
import Navbar from "./components/common/Navbar";
import Sidebar from "./components/common/Sidebar";
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

  // Nav, Sidebar 보여줄 경로
  const registeredRoutes = ["/", "/dashboard", "/board", "/map"];

  const isRegisteredRoute = registeredRoutes.some((route) =>
    route.endsWith("/") ? pathname.startsWith(route) : pathname === route
  );

  // Nav,Sidebar 숨길 경로
  const isHidden =
    ["/login", "/sign-up", "/reset-password", "/find-password"].some((route) =>
      pathname.startsWith(route)
    ) || !isRegisteredRoute;

  const isMainPage = pathname === "/";

  return (
    <html lang="ko">
      <body className={`${font.className} antialiased flex flex-col flex-1`}>
        {(!isHidden || isMainPage) && <Navbar />}
        <div className="flex min-h-screen mt-16">
          {!isHidden && !isMainPage && <Sidebar />}
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
