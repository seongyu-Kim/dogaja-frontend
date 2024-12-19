"use client";

import { usePathname } from "next/navigation";

export default function getPath(pathName: string) {
  const route = usePathname();
  return `${route}/${pathName}`;
}
