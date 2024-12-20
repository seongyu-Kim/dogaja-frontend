"use client";

import Button from "@/app/components/common/Button";

export default function SelectImage() {
  return (
    <div className="flex flex-col w-[300px] h-[200px] bg-indigo-200 rounded-lg">
      <p>이미지 선택</p>
      <div className="bg-gray-400 w-full flex items-between">
        <div className="bg-orange-300 w-1/2">
          <input type="file" />
          <span>이미지 업로드 1장</span>
        </div>
        <div className="bg-yellow-300 w-1/2">
          <p>여행 소감</p>
        </div>
      </div>
      <div className="bg-gray-400 w-full flex justify-end gap-5">
        <Button>저장</Button>
        <Button>수정</Button>
      </div>
    </div>
  );
}
