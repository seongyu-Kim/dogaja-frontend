"use client";

import React from "react";
import Image from "next/image";
import Logo from "@/app/assets/Do_logo_text.png";
import Button from "./components/common/Button";

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-between px-40">
      <div className="flex flex-col space-y-6 justify-center ml-24">
        <p className="text-6xl">
          <span className="text-[#3CB731]">404 </span>ERROR
        </p>
        <p className="text-lg text-gray-700">
          죄송합니다. 페이지를 찾을 수 없습니다.
          <br />
          존재하지 않는 주소를 입력하셨거나
          <br />
          요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
        </p>
        <Button
          style={{
            height: "h-20",
            width: "w-60",
            textSize: "text-xl",
            backgroundColor: "bg-black",
            borderRadius: "rounded-full",
          }}
        >
          홈으로
        </Button>
      </div>

      <div className="mb-10 mr-10">
        <Image src={Logo} alt="로고이미지" width={500} />
      </div>
    </div>
  );
};

export default NotFoundPage;
