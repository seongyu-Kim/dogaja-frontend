"use client";

import Link from "next/link";
import { BOARD_TYPES } from "@/app/utils/board-config";
import List from "@/app/components/domain/board/List";
import { useEffect, useState } from "react";
import { BoardListType } from "@/app/type/boardListType";
import { getAllPost } from "@/app/utils/boardApi";

type BOARD_TYPES_KEY = keyof typeof BOARD_TYPES;

export default function BoardListPage() {
  // 카테고리가 몇개가 생길지 모르니 List 컴포넌트를 BOARD_TYPES key 값 개수 만큼 추가 할 수 있게
  const [boardData, setBoardData] = useState<Record<string, BoardListType[]>>(
    {},
  );
  const boardTypeKeys = Object.keys(BOARD_TYPES);

  useEffect(() => {
    const getData = async () => {
      const res = await getAllPost();

      if (!res) return;

      setBoardData(res);
    };

    getData();
  }, []);

  return (
    <div className="flex flex-col items-center my-20">
      <p className="text-3xl mb-10">게시판 둘러보기</p>
      <div className="grid grid-cols-2 gap-4 w-1/2">
        {boardTypeKeys.map((boardType) => {
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
