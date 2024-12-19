"use client";

import Form from "@/app/components/common/Form";
import Input from "@/app/components/common/Input";
import { useState } from "react";

export function tests() {
  return console.log("폼 제출");
}

export default async function FindFriendPostCreatePage() {
  const [post, setPost] = useState({
    title: "",
    description: "",
  });
  return (
    <div className="flex justify-center">
      <form
        onSubmit={tests}
        className="w-[300px] md:w-1/2 h-[100vh] items-center mt-10"
      >
        <div className="border-b border-gray-400 pb-2 w-full flex flex-col items-center justify-center">
          <p className="text-3xl">글 작성</p>
        </div>
        <div className="flex flex-col my-10">
          <div className="bg-gray-700 flex items-center gap-3">
            <p>제목</p>
            <Input
              className="w-full"
              onChange={() => console.log(post.title)}
              type="text"
              name="title"
              value={post.title}
              required={true}
              placeholder="제목을 입력해주세요"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
