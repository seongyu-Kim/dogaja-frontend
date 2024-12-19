"use client";

import { IoDocumentText } from "react-icons/io5";
import Link from "next/link";
import getPath from "@/app/utils/getPath";
interface ListProps {
  // 임시 타입
  list: any[];
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
          return (
            <li key={item.id} className="w-full p-2 mb-5">
              <div className="flex items-center bg-gray-300 p-1 rounded-[4px] break-words w-full">
                <p className="text-sm">{item.name}</p>
              </div>
              <div className="py-1 break-words">
                <p className="text-sm">{item.comment}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
