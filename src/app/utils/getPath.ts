"use client";

import { usePathname } from "next/navigation";

export default function getPath(pathName: string) {
  const route = usePathname();
  const segments = route.split("/").filter(Boolean);

  // 각 게시판 타입 확인
  if (segments.includes("board")) {
    // 현재 경로에서 게시판 타입 찾기
    if (segments.includes("together")) {
      return `/board/together/${pathName}`;
    }
    if (segments.includes("findFriend")) {
      return `/board/findFriend/${pathName}`;
    }
    if (segments.includes("inquiry")) {
      return `/board/inquiry/${pathName}`;
    }
    if (segments.includes("review")) {
      return `/board/review/${pathName}`;
    }
  }
  if (segments.includes("admin")) {
    if (segments.includes("report")) {
      return `/admin/report/${pathName}`;
    }
  }

  // 기본 경로 처리
  segments[segments.length - 1] = pathName;
  return "/" + segments.join("/");
}

// "use client";
//
// import { usePathname } from "next/navigation";
// // 이 함수를 사용하는 컴포넌트도 클라이언트 선언을 해줘야합니다~
// export default function getPath(pathName: string) {
//   const route = usePathname();
//   return `${route}/${pathName}`;
// }
