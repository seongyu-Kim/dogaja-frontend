"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

interface Props {
  children: ReactNode;
  list: ReactNode;
}

export default function Layout({ children, list }: Props) {
  const pathname = usePathname();
  const isUpdatePage = pathname.includes("/update");

  if (isUpdatePage) {
    return <div className="flex-1">{children}</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1">{children}</div>
      <div className="flex-1">{list}</div>
    </div>
  );
}
