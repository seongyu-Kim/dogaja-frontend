"use client";

import { usePathname } from "next/navigation";
import Board from "@/app/components/domain/board/Board";
import getBoardTitle from "@/app/utils/getBoardTitle";

const testList = [
  // 임시 테스트 리스트
  {
    id: 1,
    title: "1번",
    name: "여기저기",
    image_id: null,
    //임시
    commentCount: 6,
  },
  {
    id: 2,
    title: "3번",
    name: "이거저거",
    image_id: "aa",
    //임시
    commentCount: 125,
  },
  {
    id: 3,
    title: "1번",
    name: "여기저기",
    image_id: null,
    //임시
    commentCount: 6,
  },
  {
    id: 4,
    title: "3번",
    name: "이거저거",
    image_id: "aa",
    //임시
    commentCount: 125,
  },
  {
    id: 5,
    title: "1번",
    name: "여기저기",
    image_id: null,
    //임시
    commentCount: 6,
  },
  {
    id: 6,
    title: "3번",
    name: "이거저거",
    image_id: "aa",
    //임시
    commentCount: 125,
  },
  {
    id: 7,
    title: "3번",
    name: "이거저거",
    image_id: "aa",
    //임시
    commentCount: 125,
  },
  {
    id: 8,
    title: "3번",
    name: "이거저거",
    image_id: "aa",
    //임시
    commentCount: 125,
  },
  {
    id: 9,
    title: "3번",
    name: "이거저거",
    image_id: "aa",
    //임시
    commentCount: 125,
  },
  {
    id: 10,
    title: "3번",
    name: "이거저거",
    image_id: "aa",
    //임시
    commentCount: 125,
  },
  {
    id: 11,
    title: "3번",
    name: "이거저거",
    image_id: "aa",
    //임시
    commentCount: 125,
  },
  {
    id: 12,
    title: "3번",
    name: "이거저거",
    image_id: "aa",
    //임시
    commentCount: 125,
  },
  {
    id: 13,
    title: "3번",
    name: "이거저거",
    image_id: "aa",
    //임시
    commentCount: 125,
  },
  {
    id: 14,
    title: "3번",
    name: "이거저거",
    image_id: "aa",
    //임시
    commentCount: 125,
  },
  {
    id: 15,
    title: "3번",
    name: "이거저거",
    image_id: "aa",
    //임시
    commentCount: 125,
  },
  {
    id: 16,
    title: "3번",
    name: "이거저거",
    image_id: "aa",
    //임시
    commentCount: 125,
  },
  {
    id: 17,
    title: "3번",
    name: "이거저거",
    image_id: "aa",
    //임시
    commentCount: 125,
  },
  {
    id: 18,
    title: "3번",
    name: "이거저거",
    image_id: "aa",
    //임시
    commentCount: 125,
  },
];

export default function BoardListDetail() {
  const router = usePathname();
  const boardTitle = getBoardTitle(router);
  //게시판 리스트의 경우 router 변수 사용해서 API 요청 보낸 후 리스트 출력
  return (
    <div className="flex justify-center">
      <Board name={`${boardTitle}`} list={testList} />
    </div>
  );
}
