"use client";

import Button from "@/app/components/common/Button";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function PathToCreate() {
  const { boardType, boardId } = useParams();
  const path = boardId ? "./create" : `${boardType}/create`;
  return (
    <Link href={path}>
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
