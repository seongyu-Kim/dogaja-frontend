"use client";

import React, { useState } from "react";
import Input from "@/app/components/common/Input";
import TextLogo from "@/app/assets/Do_logo_text.png";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { LuMapPin } from "react-icons/lu";
import Link from "next/link";

import Button from "@/app/components/common/Button"; // Button 컴포넌트 import

const Main: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [locations, setLocations] = useState<string[]>([
    "우리집",
    "서울역",
    "동대문",
    "광화문",
    "압구정",
    "홍대",
    "이태원",
  ]);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center mx-16 mt-32">
      <div className="flex flex-col justify-center mx-16">
        <div>
          <h1 className="text-2xl font-bold mb-2">
            Do가자와 함께라면 서울 여행 계획이 더 쉬워집니다!
          </h1>
          <p className="text-gray-500 font-bold text-xs mb-6">
            친구, 연인, 혹은 다양한 사람들과 여행 일정을 공유하며 함께
            만들어가는 특별한 순간들.
          </p>
        </div>
        <div className="flex items-start space-x-24">
          <div>
            <div className="flex items-center justify-between border-2 rounded-lg border-mainColor">
              <FaSearch className="m-2 text-lg" />
              <Input
                type="text"
                name="search"
                placeholder="여행 할 장소를 입력해주세요"
                value={searchValue}
                onChange={handleInputChange}
                required={true}
                className="w-80 border-none text-mainColor focus:ring-none placeholder-mainHover text-sm font-bold"
              />
            </div>
            <div className="flex items-center mt-1 w-full border-2 border-mainColor rounded-lg bg-mainColor bg-opacity-25 text-center">
              <ul className="text-sm font-bold w-full max-h-48 overflow-y-auto">
                {locations.map((location, index) => (
                  <li
                    key={index}
                    className={`flex items-center gap-2 py-2 px-2 hover:bg-mainHover hover:bg-opacity-50 cursor-pointer ${
                      index !== locations.length - 1
                        ? "border-b border-mainColor"
                        : ""
                    }`}
                  >
                    <LuMapPin className="text-lg" />
                    {location}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Image src={TextLogo} alt="TextLogo" width={500} height={500} />
        </div>
        <div className="mt-16 flex flex-col items-center justify-center">
        <Link
          href="/dashboard"
          className="bg-mainColor hover:bg-mainHover text-white py-2 px-4 rounded" // Tailwind CSS 클래스를 사용하여 스타일 적용
        >
          둘러보기
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Main;
