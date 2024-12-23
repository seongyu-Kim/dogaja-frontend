"use client";

import Button from "@/app/components/common/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PathToCreate() {
  const route = usePathname();
  return (
    <Link href={`${route}/create`}>
      <Button
        style={{
          backgroundColor: "bg-mainColor",
          hoverColor: "hover:bg-mainHover",
          width: "w-[100px]",
        }}
      >
        글 작성
      </Button>
    </Link>
  );
}
