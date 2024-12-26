"use client";

import { usePathname } from "next/navigation";
import Navbar from "./components/common/Navbar";
import Sidebar from "./components/common/Sidebar";
import ToastProvider from "@/app/ToastProvider";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();

  //등록 경로
  const registeredRoutes = ["/", "/dashboard", "/board/", "/map"];
  const isRegisteredRoute = registeredRoutes.some((route) =>
    route.endsWith("/") 
  ? pathname.startsWith(route) // "board/"로 시작하는 모든 경로
  : pathname === route, // 정확히 일치하는 경로
  );

  //미등록 경로
  const isHidden =
    ["/login", "/sign-up", "/reset-password", "/find-password"].includes(
      pathname,
    ) || !isRegisteredRoute;

  const isMainPage = pathname === "/";

  return (
    <>
      {(!isHidden || isMainPage) && <Navbar />}
      <div className="flex min-h-screen mt-16">
        {!isHidden && !isMainPage && <Sidebar />}
        <main className="w-full">
          <ToastProvider />
          {children}
        </main>
      </div>
    </>
  );
}
