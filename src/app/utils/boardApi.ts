"use client";

import { API } from "@/app/utils/api";
import { mainApi } from "@/app/utils/mainApi";
import { redirect } from "next/navigation";

export const createPost = async (formData: FormData, type: string) => {
  const { POST_CREATE } = API.BOARD;
  const body = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    type: type,
  };
  try {
    const res = await mainApi({
      url: POST_CREATE,
      method: "POST",
      data: body,
      withAuth: true,
    });
    if (res.status === 200) {
      return redirect("./");
    }
    return res.status;
  } catch (e) {
    console.error("게시글 생성 실패 오류", e);
  }
};
//게시글 수정
export const updatePost = async (formData: FormData, id: number) => {
  const { POST_UPDATE } = API.BOARD;
  const body = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
  };
  try {
    const res = await mainApi({
      url: POST_UPDATE(String(id)),
      method: "PUT",
      data: body,
      withAuth: true,
    });
    if (res.status === 200) {
      return redirect("./");
    }
  } catch (e) {
    console.error(e);
  }
};
//게시글 삭제
export const deletePost = async (id: number) => {
  const { POST_DELETE } = API.BOARD;
  try {
    const res = await mainApi({
      url: POST_DELETE(String(id)),
      method: "DELETE",
      withAuth: true,
    });
    if (res.status === 200) {
      return res.status;
    }
  } catch (e) {
    console.error(e);
  }
};

//댓글 생성
export const createComment = async (formData: FormData, id: string) => {
  const { COMMENT_CREATE } = API.COMMENT;
  try {
    await mainApi({
      url: COMMENT_CREATE(id),
      method: "POST",
      data: { content: formData.get("content") as string },
      withAuth: true,
    });
  } catch (e) {
    console.error(e);
  }
};

//댓글 수정
export const updateComment = async (
  formData: FormData,
  commentId: string,
  postId: string,
) => {
  const { COMMENT_UPDATE } = API.COMMENT;
  try {
    const res = await mainApi({
      url: COMMENT_UPDATE(postId, commentId),
      method: "PUT",
      data: { content: formData.get("content") as string },
      withAuth: true,
    });
    if (res.status === 200) {
      return res.status;
    }
  } catch (e) {
    console.error(e);
  }
};

//댓글 삭제
export const deleteComment = async (commentId: string, postId: string) => {
  const { COMMENT_DELETE } = API.COMMENT;
  try {
    const res = await mainApi({
      url: COMMENT_DELETE(postId, commentId),
      method: "DELETE",
      withAuth: true,
    });
    if (res.status === 200) {
      return res.status;
    }
  } catch (e) {
    console.error(e);
  }
};

//특정 신고 삭제
export const deleteReport = async (reportId: number) => {
  const { REPORT_DELETE } = API.REPORT;
  try {
    const res = await mainApi({
      url: REPORT_DELETE(String(reportId)),
      method: "DELETE",
      withAuth: true,
    });
    if (res.status === 200) {
      return res.status;
    }
  } catch (e) {
    console.error(e);
  }
};
