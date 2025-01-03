"use client";

import { PiChatTeardropText } from "react-icons/pi";
import { useState } from "react";
import UserChatArea from "@/app/components/UserChatArea";

export default function UserChatBox() {
  const [adminChatClick, setAdminChatClick] = useState<boolean>(false);
  return (
    <div className="hidden md:block">
      {!adminChatClick ? (
        <div
          onClick={() => {
            setAdminChatClick(!adminChatClick);
          }}
          className="flex items-center group bg-white border shadow-2xl fixed bottom-5 right-5 py-4 rounded-md cursor-pointer w-[70px] h-[70px] hover:w-[200px] transition-all duration-150 ease-in-out overflow-hidden"
        >
          <div className="flex items-center group-hover:translate-x-3 transition-transform duration-300">
            <PiChatTeardropText className="w-[50px] h-[50px] text-gray-500 ml-2" />
            <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-3 whitespace-nowrap">
              관리자와 채팅
            </p>
          </div>
        </div>
      ) : (
        <UserChatArea
          adminChatClick={adminChatClick}
          setAdminChatClick={setAdminChatClick}
        />
      )}
    </div>
  );
}
