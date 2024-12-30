"use client";

import React, { useEffect, useRef, useState } from "react";
import NicknameClickToggleWindow from "@/app/components/domain/board/NicknameClickToggleWindow";
import { useUserStore } from "@/app/store/userStore";

interface Props {
  name: string;
}

export default function NickNameBox({ name }: Props) {
  const [toggleWindow, setToggleWindow] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const toggleWindowRef = useRef<HTMLDivElement>(null);
  const { user } = useUserStore();

  useEffect(() => {
    const handelOutsidClick = (e: MouseEvent) => {
      const current = toggleWindowRef.current;
      if (current && !current.contains(e.target as Node)) {
        setToggleWindow(false);
      }
    };
    document.addEventListener("mousedown", handelOutsidClick);
    return () => {
      document.removeEventListener("mousedown", handelOutsidClick);
    };
  }, []);

  const handleNickNameClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    const { clientX, clientY } = e;
    setPosition({ x: clientX, y: clientY });
    setToggleWindow((prev) => !prev);
  };

  //유저 정보 없을 시 이름만 표기
  if (!user) {
    return <p>{name}</p>;
  }

  return (
    <>
      <p className="cursor-pointer" onClick={handleNickNameClick}>
        {name}
      </p>
      {toggleWindow && (
        <div ref={toggleWindowRef}>
          <NicknameClickToggleWindow
            name={name}
            onClose={setToggleWindow}
            x={position.x}
            y={position.y}
          />
        </div>
      )}
    </>
  );
}
