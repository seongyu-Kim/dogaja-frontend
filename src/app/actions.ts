"use client";

import { mainApi } from "@/app/utils/mainApi";
import { API } from "@/app/utils/api";
import { BoardListType } from "@/app/type/boardListType";
import { ErrorAlert, SuccessAlert } from "@/app/utils/toastAlert";

// 예시
// export async function test() {
//     const link = "api/123";
//     const body = {
//         title: "제목",
//         des: "설명",
//     };
//     try {
//         const res = await mainApi({
//             url: link, // 필수 값
//             method: "GET", // 필수 값
//             data: body,
//             withCredentials = true // 기본값 false - 인증 정보(토큰 등) 쿠키 사용한다면 true로 보내주세요
//             withAuth = true // 기본값 false - 로그인과 같이 토큰 사용해 인증한다면 true로 바꿔주세요
//         });
//         if (res.status === 200) {
//             console.log("테스트 성공");
//         }
//     } catch (e) {
//         // throw new Error("에러");
//         console.error(e);
//     }
// }

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
    ErrorAlert("친구 게시판 리스트 조회 오류");
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
    ErrorAlert("문의 게시판 리스트 조회 오류");
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
    ErrorAlert("후기 게시판 리스트 조회 오류");
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
    ErrorAlert("동행 게시판 리스트 조회 오류");
  }
};

export const createPost = async (formData: FormData, type: string) => {
  if (!formData || !type) {
    return;
  }
  console.log("실행");
  console.log(type);
  const { POST_CREATE } = API.BOARD;
  console.log(POST_CREATE);
  const body = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    type: type,
  };
  console.log(body);
  try {
    const res = await mainApi({
      url: POST_CREATE,
      method: "POST",
      data: body,
    });
    if (res.status === 200) {
      SuccessAlert("게시물 생성 성공!");
    }
  } catch (e) {
    console.log("게시글 생성 실패 오류", e);
    ErrorAlert("게시글 생성 실패");
  }
};
