"use server";

import { mainApi } from "@/app/utils/mainApi";
import { API } from "@/app/utils/api";
import { BoardListType, ReadBoardType } from "@/app/type/boardListType";
import { redirect } from "next/navigation";

//추후 board 리스트 요청 함수 통합
export const getFriendBoardList = async () => {
  const { BOARD_FRIEND_GET } = API.BOARD;
  try {
    const res = await mainApi({
      url: BOARD_FRIEND_GET,
      method: "GET",
    });
    if (res.status === 200) {
      return res.data as BoardListType[];
    }
  } catch (e) {
    console.error("친구 게시판 리스트 조회 오류", e);
  }
};

export const getAskBoardList = async () => {
  const { BOARD_ASK_GET } = API.BOARD;
  try {
    const res = await mainApi({
      url: BOARD_ASK_GET,
      method: "GET",
    });
    if (res.status === 200) {
      return res.data as BoardListType[];
    }
  } catch (e) {
    console.error("문의 게시판 리스트 조회 오류", e);
  }
};

export const getReviewBoardList = async () => {
  const { BOARD_REVIEW_GET } = API.BOARD;
  try {
    const res = await mainApi({
      url: BOARD_REVIEW_GET,
      method: "GET",
    });
    if (res.status === 200) {
      return res.data as BoardListType[];
    }
  } catch (e) {
    console.error("후기 게시판 리스트 조회 오류", e);
  }
};

export const getWithBoardList = async () => {
  const { BOARD_REVIEW_GET } = API.BOARD;
  try {
    const res = await mainApi({
      url: BOARD_REVIEW_GET,
      method: "GET",
    });
    if (res.status === 200) {
      return res.data as BoardListType[];
    }
  } catch (e) {
    console.error("동행 게시판 리스트 조회 오류", e);
  }
};

//추후 토큰 값 가져와서 사용
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

//게시글 상세보기
export const readPost = async (id: number) => {
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
//게시글 수정
export const updatePost = async (formData: FormData, id: number) => {
  const { POST_READ } = API.BOARD;
  const body = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
  };
  console.log(body);
  try {
    const res = await mainApi({
      url: POST_READ(String(id)),
      method: "PUT",
      data: body,
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
  const { POST_READ } = API.BOARD;
  try {
    const res = await mainApi({
      url: POST_READ(String(id)),
      method: "DELETE",
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
    });
    if (res.status === 200) {
      return res.status;
    }
  } catch (e) {
    console.error(e);
  }
};
