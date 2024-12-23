"use client";

import Link from "next/link";
import { BOARD_TYPES } from "@/app/utils/board-config";
import List from "@/app/components/common/List";

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

export default function BoardListPage() {
  //추후 리스트 클릭시 해당 카테고리의 게시물 ID로 이동하게 수정
  // 카테고리가 몇개가 생길지 모르니 List 컴포넌트를 BOARD_TYPES key 값 개수 만큼 추가 할 수 있게
  // 각 게시판 마다 GET 요청해서 가져오는 부분 구현
  return (
    <div className="flex flex-col items-center mt-20">
      <div className="grid grid-cols-2 gap-4 w-1/2">
        {Object.keys(BOARD_TYPES).map((boardType) => (
          <div key={boardType} className="p-4 border rounded-md">
            <Link href={`/board/${boardType}`}>
              <p className="border-b border-gray-400 text-3xl">
                {BOARD_TYPES[boardType as keyof typeof BOARD_TYPES].title}{" "}
                게시판
              </p>
            </Link>
            <div>
              <List
                list={testList.sort((a, b) => a.id - b.id).slice(0, 10)}
                preview={false}
                // board 경로에서 각 게시물 리스트 클릭해서 해당 게시판 넘어갈 수 있게 boardType 추가
                boardType={boardType}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
