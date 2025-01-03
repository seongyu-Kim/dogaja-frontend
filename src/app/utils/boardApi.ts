"use client";

import { API } from "@/app/utils/api";
import { mainApi } from "@/app/utils/mainApi";
import { AxiosError, AxiosResponse } from "axios";
import { ScheduleType } from "@/app/type/scheduleListType";

export const createPost = async (
  formData: FormData,
  type: string,
): Promise<AxiosResponse<any> | undefined> => {
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
    if (res.status === 201) {
      return res;
    }
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
      return res.status;
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
    const res = await mainApi({
      url: COMMENT_CREATE(id),
      method: "POST",
      data: { content: formData.get("content") as string },
      withAuth: true,
    });
    if (res.status === 201) {
      return res.status;
    }
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

//닉네임 친구 요청
export const requestFriend = async (friendName: string) => {
  const { FRIENDS_REQUEST_POST } = API.FRIENDS;
  try {
    const res = await mainApi({
      url: FRIENDS_REQUEST_POST,
      method: "POST",
      data: { friendName: friendName },
      withAuth: true,
    });
    if (res.status === 200) {
      return res.status;
    }
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return e.status;
  }
};

//일정 리스트 조회
export const scheduleGet = async () => {
  const { SCHEDULE_LIST_GET } = API.SCHEDULE;
  try {
    const res = await mainApi({
      url: SCHEDULE_LIST_GET,
      method: "GET",
      withAuth: true,
    });
    if (res.status === 200) {
      return res.data as ScheduleType[];
    }
  } catch (e) {
    console.error(e);
  }
};

//일정 리스트 삭제 요청
export const scheduleDelete = async (id: string) => {
  const { SCHEDULE_DELETE } = API.SCHEDULE;
  try {
    const res = await mainApi({
      url: SCHEDULE_DELETE(id),
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
