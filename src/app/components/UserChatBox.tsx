"use client";

import { PiChatTeardropText } from "react-icons/pi";
import { useState } from "react";
import UserChatArea from "@/app/components/UserChatArea";

export default function UserChatBox() {
  const [adminChatClick, setAdminChatClick] = useState<boolean>(false);
  console.log(adminChatClick);
  return (
    <>
      {!adminChatClick ? (
        <div
          onClick={() => {
            setAdminChatClick(!adminChatClick);
          }}
          className="flex gap-3 items-center justify-center group bg-white border shadow-2xl fixed bottom-5 right-5 py-4 rounded-md cursor-pointer w-[70px] h-[70px] hover:w-[200px] transition-all duration-120 ease-in-out"
        >
          <PiChatTeardropText className="w-[50px] h-[50px] text-gray-500" />
          <p className="group-hover:block hidden">관리자와 채팅</p>
        </div>
      ) : (
        <UserChatArea
          adminChatClick={adminChatClick}
          setAdminChatClick={setAdminChatClick}
        />
      )}
    </>
  );
}
