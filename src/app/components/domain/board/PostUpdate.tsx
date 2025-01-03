"use client";

import Input from "@/app/components/common/Input";
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import Button from "@/app/components/common/Button";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ErrorAlert, SuccessAlert } from "@/app/utils/toastAlert";
import { updatePost } from "@/app/utils/boardApi";
import { modules } from "@/app/utils/reactQuillOptions";
import ReactQuill from "react-quill";

interface PostType {
  post: {
    title: string;
    content: string;
  };
}

export default function PostUpdate({ post }: PostType) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [disabled, setDisabled] = useState(true);

  const boardId = useParams().boardId;
  const router = useRouter();

  useEffect(() => {
    setDisabled(!title.trim() || !content.trim());
  }, [title, content]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (disabled) {
      ErrorAlert("모든 필드를 다 채워주세요");
      return;
    }

    const formData = new FormData(e.target as HTMLFormElement);
    formData.append("content", content);

    const res = await updatePost(formData, Number(boardId));

    if (res === 200) {
      SuccessAlert("게시글 수정 성공");
      router.push("./");
      return;
    }

    if (res !== 200) {
      ErrorAlert("게시물 수정 실패");
    }
  };

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-[300px] md:w-1/2 h-auto items-center mt-10"
      >
        <div className="border-b border-gray-400 pb-2 w-full flex flex-col items-center justify-center">
          <p className="text-3xl">글 수정</p>
        </div>
        <div className="flex flex-col my-10 gap-5">
          <div className="flex items-center justify-center gap-3 mb-2">
            <p className="mr-1 hidden md:block">제목</p>
            <Input
              className="w-[95%]"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              type="text"
              name="title"
              value={title}
              required={true}
              placeholder="제목을 입력해주세요"
            />
          </div>
          <div className="h-[500px]">
            <ReactQuill
              onChange={setContent}
              modules={modules}
              className="h-full"
              value={content}
              theme="snow"
            />
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 mt-16">
          <Link href="./">
            <Button
              style={{
                backgroundColor: "bg-mainRed",
                hoverColor: "hover:bg-mainRedHover",
                width: "w-[100px]",
              }}
            >
              취소
            </Button>
          </Link>
          <Button
            type="submit"
            style={{
              backgroundColor: `${disabled ? "bg-gray-400" : "bg-mainColor"}`,
              hoverColor: `${disabled ? "" : "hover:bg-mainHover"}`,
              width: "w-[100px]",
            }}
            disabled={disabled}
          >
            작성
          </Button>
        </div>
      </form>
    </div>
  );
}
