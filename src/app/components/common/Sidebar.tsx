"use client";

import React from "react";
import Link from "next/link";
import {
  FaRegListAlt,
  FaRegUser,
  FaRegCalendarAlt,
  FaLongArrowAltLeft,
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="w-20 border-r-4 border-mainColor text-mainColor h-auto">
      <ul className="flex flex-col text-center text-xs">
        <li className="p-2 pb-4 hover:underline hover:scale-105 cursor-pointer border-b-2 border-mainColor">
          <Link href="/map" className="flex flex-col items-center">
            <div className="flex items-center justify-center p-2">
              <FaLongArrowAltLeft className="text-xl" />
            </div>
          </Link>
          map으로
        </li>

        <li className="p-2 mt-4 hover:underline hover:scale-105 cursor-pointer">
          <Link href="/board" className="flex flex-col items-center">
            <div className="flex items-center justify-center border-2 border-mainColor rounded-full p-2">
              <FaRegListAlt className="text-xl" />
            </div>
          </Link>
          게시판
        </li>

        <li className="p-2 mt-4 hover:underline hover:scale-105 cursor-pointer">
          <Link href="/mypage" className="flex flex-col items-center">
            <div className="flex items-center justify-center border-2 border-mainColor rounded-full p-2">
              <FaRegUser className="text-xl" />
            </div>
          </Link>
          마이페이지
        </li>

        <li className="p-2 mt-4 hover:underline hover:scale-105 cursor-pointer">
          <Link href="/schedule" className="flex flex-col items-center">
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
