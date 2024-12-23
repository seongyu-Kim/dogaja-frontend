"use client";

import Button from "@/app/components/common/Button";
import { useState } from "react";
import { usePathname } from "next/navigation";
//id값 넘겨 받아서 api 연동 준비??
export default function CommentCreate() {
  const [comment, setComment] = useState("");
  const router = usePathname(); // 임시 /board/review/7 예시
  return (
    <form>
      <div className="h-[100px] mb-[100px] flex gap-2">
        <textarea
          onChange={(e) => setComment(e.target.value)}
          className="w-full h-full resize-none p-2 rounded-md border border-gray-400 focus:outline-none"
          placeholder="댓글을 입력해주세요"
        />
        <Button
          style={{
            backgroundColor: "bg-mainColor",
            hoverColor: "hover:bg-mainHover",
            height: "h-full",
            width: "w-20",
            padding: "py-2",
          }}
        >
          댓글 작성
        </Button>
      </div>
    </form>
  );
}
