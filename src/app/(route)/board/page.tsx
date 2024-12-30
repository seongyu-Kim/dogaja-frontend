"use client";

import Link from "next/link";
import { BOARD_TYPES } from "@/app/utils/board-config";
import List from "@/app/components/common/List";
import { useEffect, useState } from "react";
import { BoardListType } from "@/app/type/boardListType";
import boardTypeRequest from "@/app/utils/boardTypeRequest";
import { ErrorAlert } from "@/app/utils/toastAlert";

type BOARD_TYPES_KEY = keyof typeof BOARD_TYPES;

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

  const [boardData, setBoardData] = useState<Record<string, BoardListType[]>>(
    {},
  );
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const result: Record<string, BoardListType[]> = {};
        const boardType = Object.keys(BOARD_TYPES);

        await Promise.all(
          boardType.map(async (boardType) => {
            const data = await boardTypeRequest(boardType as BOARD_TYPES_KEY);
            if (data) {
              result[boardType] = data;
              return;
            }
            result[boardType] = [];
          }),
        );

        setBoardData(result);
      } catch (e) {
        console.error(e);
        ErrorAlert("데이터 조회에 실패했습니다");
      } finally {
        setloading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return <p className="text-center">게시글 불러오는 중</p>;
  }

  return (
    <div className="flex flex-col items-center my-20">
      <p className="text-3xl mb-10">게시판 둘러보기</p>
      <div className="grid grid-cols-2 gap-4 w-1/2">
        {Object.keys(BOARD_TYPES).map((boardType) => {
          const title = BOARD_TYPES[boardType as BOARD_TYPES_KEY].title;
          const boardList = boardData[boardType] || [];
          return (
            <div
              key={boardType}
              className="p-4 border border-mainColor rounded-md h-full"
            >
              <Link href={`/board/${boardType}`}>
                <p className="border-b border-gray-400 text-3xl">
                  {title} 게시판
                </p>
              </Link>
              <div className="h-[450px]">
                <List
                  list={boardList.sort((a, b) => b.id - a.id).slice(0, 10)}
                  preview={false}
                  // board 경로에서 각 게시물 리스트 클릭해서 해당 게시판 넘어갈 수 있게 boardType 추가
                  boardType={boardType}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
