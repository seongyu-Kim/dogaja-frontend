"use client";

import Button from "@/app/components/common/Button";
import Link from "next/link";
import getPath from "@/app/utils/getPath";

export default function PathToCreate() {
  const route = getPath("create");
  return (
    <Link href={route}>
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
