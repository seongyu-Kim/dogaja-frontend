"use client";

import { usePathname } from "next/navigation";
import Navbar from "./components/common/Navbar";
import Sidebar from "./components/common/Sidebar";
import ToastProvider from "@/app/ToastProvider";
import { useUserStore } from "@/app/store/userStore";
import UserChatBox from "@/app/components/UserChatBox";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  const { user } = useUserStore();

  // Nav, Sidebar 보여줄 경로
  const registeredRoutes = ["/", "/dashboard", "/board", "/map"];

  const isRegisteredRoute = registeredRoutes.some((route) =>
    route.endsWith("/") ? pathname.startsWith(route) : pathname === route,
  );

  // Nav,Sidebar 숨길 경로
  const isHidden =
    ["/login", "/sign-up", "/reset-password", "/find-password"].some((route) =>
      pathname.startsWith(route),
    ) || !isRegisteredRoute;

  const isMainPage = pathname === "/";

  return (
    <>
      {(!isHidden || isMainPage) && <Navbar />}
      <div className="flex min-h-screen mt-14">
        {!isHidden && !isMainPage && <Sidebar />}
        {user && <UserChatBox />}
        <main className="w-full">
          <ToastProvider />
          {children}
        </main>
      </div>
    </>
  );
}
