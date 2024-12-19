"use client";

import Form from "@/app/components/common/Form";
import Input from "@/app/components/common/Input";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules } from "@/app/utils/reactQuillOptions";

//임시 폼 액션 - 글 작성
export function tests() {
  return console.log("폼 제출");
}

export default function PostCreate() {
  const [post, setPost] = useState({
    title: "",
    description: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPost({
      ...post,
      [name]: value,
    });
  };

  const handleDescriptionChange = (value: string) => {
    setPost({
      ...post,
      description: value,
    });
  };

  return (
    <div className="flex justify-center">
      <form
        onSubmit={tests}
        className="w-[300px] md:w-1/2 h-[100vh] items-center mt-10 "
      >
        <div className="border-b border-gray-400 pb-2 w-full flex flex-col items-center justify-center">
          <p className="text-3xl">글 작성</p>
        </div>
        <div className="flex flex-col my-10 gap-5">
          <div className="flex items-center justify-center gap-3 mb-2">
            <p className="mr-1 hidden md:block">제목</p>
            <Input
              className="w-[95%]"
              onChange={handleChange}
              type="text"
              name="title"
              required={true}
              placeholder="제목을 입력해주세요"
            />
          </div>
          <div className="h-[500px]">
            <ReactQuill
              onChange={handleDescriptionChange}
              modules={modules}
              className="h-full"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
