"use client";

import Input from "@/app/components/common/Input";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules } from "@/app/utils/reactQuillOptions";
import Button from "@/app/components/common/Button";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ErrorAlert, SuccessAlert } from "@/app/utils/toastAlert";
import { updatePost } from "@/app/utils/boardApi";
import { API } from "@/app/utils/api";
import { mainApi } from "@/app/utils/mainApi";
import { ReadBoardType } from "@/app/type/boardListType";

export default function PostUpdate() {
  //임시 라우터 추후 API 연동 할 때 게시판명, id 분리해서 사용 하거나 상위에서 params 받게해서 처리
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [disabled, setDisabled] = useState(true);
  const boardId = useParams().boardId;
  const router = useRouter();

  //게시글 상세보기
  const getPostId = async (id: number) => {
    const { POST_READ } = API.BOARD;
    try {
      const res = await mainApi({
        url: POST_READ(String(id)),
        method: "GET",
      });
      if (res.status === 200) {
        return res.data as ReadBoardType;
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    setDisabled(!title.trim() || !content.trim());
  }, [title, content]);

  useEffect(() => {
    const getPost = async () => {
      const res = await getPostId(Number(boardId));
      if (res) {
        setTitle(res.title);
        setContent(res.content);
      }
    };
    getPost();
  }, []);

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
