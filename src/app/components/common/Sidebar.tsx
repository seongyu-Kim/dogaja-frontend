"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegListAlt, FaRegUser, FaRegCalendarAlt } from "react-icons/fa";
import { FaCompass } from "react-icons/fa6";

export default function Sidebar() {
  const [isBoardOpen, setIsBoardOpen] = useState(false);
  const pathname = usePathname();

  const toggleBoardMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsBoardOpen((prev) => !prev);
  };

  return (
    <aside className="w-20 border-r-4 border-mainColor text-mainColor h-auto">
      <ul className="flex flex-col text-center text-xs min-w-20">
        {pathname !== "/dashboard" && (
          <li className="mt-4 p-2 pb-2 hover:underline hover:scale-105 cursor-pointer transition-all duration-300 ease-in-out">
            <Link href="/dashboard" className="flex flex-col items-center">
              <div className="flex items-center justify-center border-2 border-mainColor rounded-full p-2">
                <FaCompass className="text-xl" />
              </div>
            </Link>
            장소 정보 보기
          </li>
        )}

        {/* 게시판 */}
        <li className="p-2 mt-4 cursor-pointer">
          <div
            className="flex flex-col items-center hover:underline hover:scale-105 transition-all duration-300 ease-in-out"
            onClick={toggleBoardMenu}
          >
            <div className="flex items-center justify-center border-2 border-mainColor rounded-full p-2">
              <FaRegListAlt className="text-xl" />
            </div>
            게시판
          </div>
          {/* 하위 목록 */}
          {isBoardOpen && (
            <ul className="mt-2.5 text-center text-xs">
              <li className="py-1.5 hover:underline hover:text-mainColor hover:scale-110 transition-all duration-300 ease-in-out">
                <Link href="/board">둘러보기</Link>
              </li>
              <li className="py-1.5 hover:underline hover:text-mainColor hover:scale-110 transition-all duration-300 ease-in-out">
                <Link href="/board/friend">친구 구함</Link>
              </li>
              <li className="py-1.5 hover:underline hover:text-mainColor hover:scale-110 transition-all duration-300 ease-in-out">
                <Link href="/board/ask">문의</Link>
              </li>
              <li className="py-1.5 hover:underline hover:text-mainColor hover:scale-110 transition-all duration-300 ease-in-out">
                <Link href="/board/review">후기</Link>
              </li>
              <li className="py-1.5 hover:underline hover:text-mainColor hover:scale-110 transition-all duration-300 ease-in-out">
                <Link href="/board/with">동행</Link>
              </li>
            </ul>
          )}
        </li>

        <li className="p-2 mt-4 hover:underline hover:scale-105 cursor-pointer transition-all duration-300 ease-in-out">
          <Link href="/my-page" className="flex flex-col items-center">
            <div className="flex items-center justify-center border-2 border-mainColor rounded-full p-2">
              <FaRegUser className="text-xl" />
            </div>
          </Link>
          마이페이지
        </li>

        <li className="p-2 mt-4 hover:underline hover:scale-105 cursor-pointer transition-all duration-300 ease-in-out">
          <Link href="/my-schedule" className="flex flex-col items-center">
            <div className="flex items-center justify-center border-2 border-mainColor rounded-full p-2">
              <FaRegCalendarAlt className="text-xl" />
            </div>
          </Link>
          일정관리
        </li>
      </ul>
    </aside>
  );
}
