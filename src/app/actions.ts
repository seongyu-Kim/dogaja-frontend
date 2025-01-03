"use server";

import { API } from "@/app/utils/api";
import { mainApi } from "@/app/utils/mainApi";
import { BoardListType, ReadBoardType } from "@/app/type/boardListType";

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
//추후 토큰 값 가져와서 사용
export const getWithBoardList = async () => {
  const { BOARD_WITH_GET } = API.BOARD;
  try {
    const res = await mainApi({
      url: BOARD_WITH_GET,
      method: "GET",
    });
    if (res.status === 200) {
      return res.data as BoardListType[];
    }
  } catch (e) {
    console.error("동행 게시판 리스트 조회 오류", e);
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
