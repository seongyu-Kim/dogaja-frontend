"use client";

import Button from "@/app/components/common/Button";
import React, { useState } from "react";
import { ErrorAlert } from "@/app/utils/toastAlert";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { fileSize } from "@/app/utils/byteToSize";

interface SelectImageProps {
  comment?: boolean;
  descriptionText?: string;
}

export default function SelectImage({
  comment = false,
  descriptionText = "",
}: SelectImageProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [commentText, setCommentText] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // 파일 크기 체크 (예: 5MB)
    if (fileSize.byteToMb(file.size) > 5) {
      ErrorAlert("파일 크기는 5MB를 초과할 수 없습니다.");
      return;
    }

    // 파일 타입 체크
    if (!file.type.startsWith("image/")) {
      ErrorAlert("이미지 파일만 선택할 수 있습니다.");
      return;
    }

    setImageFile(file);

    // 미리보기 URL 생성
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    //  임시 추후 바로 아래 div w h 옵션 auto로 조정
    <div className="flex flex-col gap-2 w-full min-h-44 max-w-32 min-w-20 border rounded-lg p-1.5 text-center overflow-hidden">
      <div className="pb-1 border-b border-gray-400 w-full flex items-start flex-grow">
        <div className="w-full h-full flex flex-col items-center justify-center gap-1">
          {imageFile ? (
            <div className="w-full flex items-center justify-center">
              <img
                src={preview!}
                alt="이미지"
                className="max-w-full max-h-36 object-cover rounded-lg"
              />
            </div>
          ) : (
            <MdOutlineAddPhotoAlternate className="text-[50px] text-gray-400" />
          )}
        </div>
        {comment && (
          <div className="w-full h-[90%]">
            <p>여행 소감</p>
            <textarea
              className="w-full h-full resize-none p-2 rounded-md border border-gray-400 focus:outline-none"
              onChange={(e) => setCommentText(e.target.value)}
            />
          </div>
        )}
      </div>
      <div className="flex-shrink-0">
        <ButtonBox onChange={handleImageChange} />
      </div>
    </div>
  );
}

//임시 저장-수정(작성자에게만 보이게) 저장 API 연동
function ButtonBox({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="w-full flex justify-center">
      <div className="flex items-center justify-center">
        <label
          htmlFor="fileSelectImage"
          className="bg-mainColor text-white w-auto p-1 rounded-lg text-xs hover:bg-mainHover cursor-pointer"
        >
          업로드
        </label>
        <input
          id="fileSelectImage"
          type="file"
          className="hidden"
          onChange={onChange}
          accept="image/png, image/jpg, image/jpeg"
        />
      </div>
    </div>
  );
}
