"use client";

import { CommentType } from "@/app/type/boardListType";

interface ListProps {
  // 임시 타입
  list: CommentType[];
}
// 추가로 라우터 주소, 받아야함
export default function CommentList({ list }: ListProps) {
  if (!list) {
    return <p>댓글이 없습니다.</p>;
  }
  return (
    <main className="w-[300px] md:w-auto">
      <ul className="flex flex-col items-center justify-center w-full">
        {list.map((item) => {
          const { id, content, user } = item;
          return (
            <li key={id} className="w-full p-2 mb-5">
              <div className="flex items-center justify-between bg-gray-300 p-1 rounded-[4px] break-words w-full">
                <p className="text-sm">{user.name}</p>
                <div className="flex items-center gap-2 mr-2">
                  <button className="text-sm">수정</button>
                  <button className="text-sm">삭제</button>
                </div>
              </div>
              <div className="py-1 break-words">
                <p className="text-sm">{content}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
