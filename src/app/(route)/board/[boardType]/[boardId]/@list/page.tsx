"use client";

import Board from "@/app/components/domain/board/Board";
import { usePathname } from "next/navigation";
import getBoardTitle from "@/app/utils/getBoardTitle";

const testList = [
  // 임시 테스트 리스트
  {
    id: 1,
    title: "1번",
    name: "여기저기",
    image_id: null,
    commentCount: 6,
  },
  {
    id: 2,
    title: "3번",
    name: "이거저거",
    image_id: "aa",
    commentCount: 125,
  },
  {
    id: 3,
    title: "1번",
    name: "여기저기",
    image_id: null,
    commentCount: 6,
  },
  {
    id: 4,
    title: "3번",
    name: "이거저거",
    image_id: "aa",
    commentCount: 125,
  },
  {
    id: 5,
    title: "1번",
    name: "여기저기",
    image_id: null,
    commentCount: 6,
  },
  {
    id: 6,
    title: "3번",
    name: "이거저거",
    image_id: "aa",
    commentCount: 125,
  },
  {
    id: 7,
    title: "3번",
    name: "이거저거",
    image_id: "aa",
    commentCount: 125,
  },
  {
    id: 8,
    title: "3번",
    name: "이거저거",
    image_id: "aa",
    commentCount: 125,
  },
  {
    id: 9,
    title: "3번",
    name: "이거저거",
    image_id: "aa",
    commentCount: 125,
  },
  {
    id: 10,
    title: "3번",
    name: "이거저거",
    image_id: "aa",
    commentCount: 125,
  },
  {
    id: 11,
    title: "3번",
    name: "이거저거",
    image_id: "aa",
    commentCount: 125,
  },
  {
    id: 12,
    title: "3번",
    name: "이거저거",
    image_id: "aa",
    commentCount: 125,
  },
  {
    id: 13,
    title: "3번",
    name: "이거저거",
    image_id: "aa",
    commentCount: 125,
  },
  {
    id: 14,
    title: "3번",
    name: "이거저거",
    image_id: "aa",
    commentCount: 125,
  },
  {
    id: 15,
    title: "3번",
    name: "이거저거",
    image_id: "aa",
    commentCount: 125,
  },
  {
    id: 16,
    title: "3번",
    name: "이거저거",
    image_id: "aa",
    commentCount: 125,
  },
  {
    id: 17,
    title: "3번",
    name: "이거저거",
    image_id: "aa",
    commentCount: 125,
  },
  {
    id: 18,
    title: "3번",
    name: "이거저거",
    image_id: "aa",
    commentCount: 125,
  },
];

export default function ListPage() {
  const router = usePathname();
  const boardTitle = getBoardTitle(router);
  const postId = router.split("/").slice(-1); // 임시 내가 보고 있는 게시물 리스트에서 표기
  return (
    <div className="flex justify-center">
      <Board name={`${boardTitle}`} list={testList} detailList={true} />
    </div>
  );
}
