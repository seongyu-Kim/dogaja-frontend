"use client";

import Input from "@/app/components/common/Input";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules } from "@/app/utils/reactQuillOptions";
import Button from "@/app/components/common/Button";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { readPost, updatePost } from "@/app/actions";
import { ErrorAlert, SuccessAlert } from "@/app/utils/toastAlert";

export default function PostUpdate() {
  //임시 라우터 추후 API 연동 할 때 게시판명, id 분리해서 사용 하거나 상위에서 params 받게해서 처리
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const boardId = useParams().boardId;
  const isDisabled = !title || !title;

  useEffect(() => {
    const getPost = async () => {
      const res = await readPost(Number(boardId));
      if (res) {
        setTitle(res.title);
        setContent(res.content);
      }
    };
    getPost();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    formData.append("content", content);
    const res = await updatePost(formData, Number(boardId));
    if (res !== 200) {
      ErrorAlert("게시물 삭제 실패");
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
              backgroundColor: "bg-mainColor",
              hoverColor: "hover:bg-mainHover",
              width: "w-[100px]",
            }}
            disabled={isDisabled}
            className={`${isDisabled && "bg-gray-400 hover:bg-gray-400"}`}
          >
            작성
          </Button>
        </div>
      </form>
    </div>
  );
}
