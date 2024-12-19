"use client";

import { usePathname } from "next/navigation";
// 이 함수를 사용하는 컴포넌트도 클라이언트 선언을 해줘야합니다~
export default function getPath(pathName: string) {
  const route = usePathname();
  return `${route}/${pathName}`;
}
