"use client";

import Button from "@/app/components/common/Button";
import { useState } from "react";

import { createComment } from "@/app/utils/boardApi";
//id값 넘겨 받아서 api 연동 준비??
export default function CommentCreate({ id }: { id: string }) {
  const [content, setcontent] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    await createComment(formData, id);
  };
  //임시 - 로그인(유저정보)정보 없으면 null 반환하게
  return (
    <form onSubmit={handleSubmit}>
      <div className="h-[100px] mb-[100px] flex gap-2">
        <textarea
          name="content"
          onChange={(e) => setcontent(e.target.value)}
          className="w-full h-full resize-none p-2 rounded-md border border-gray-400 focus:outline-none"
          placeholder="댓글을 입력해주세요"
        />
        <Button
          disabled={!content}
          type="submit"
          style={{
            backgroundColor: `${content ? "bg-mainColor" : "bg-gray-400"}`,
            hoverColor: `${content ? "hover:bg-mainHover" : ""}`,
            height: "h-full",
            width: "w-20",
            padding: "py-2",
          }}
          className={`${!content && "bg-gray-400 hover:bg-gray-400"}`}
        >
          댓글 작성
        </Button>
      </div>
    </form>
  );
}
