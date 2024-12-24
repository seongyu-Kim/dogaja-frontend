"use client";

import React, { useState } from "react";
import Form from "@/app/components/common/Form";
import Input from "@/app/components/common/Input";
import Button from "@/app/components/common/Button";
import Logo from "@/app/assets/Do_logo_non_text.png";
import Image from "next/image";

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!password) {
      setError("비밀번호를 입력해주세요");
      return;
    }

    if (password !== confirmPassword) {
      setError("비밀번호 확인이 일치하지 않습니다");
      return;
    }
    console.log("비밀번호 변경 성공");
  };

  return (
    <div className="flex items-center min-h-screen">
      <div className="max-w-md w-full mx-auto p-4 border rounded-md shadow-xl drop-shadow-sm h-[600px]">
        <Form onSubmit={handleSubmit}>
          <Image src={Logo} alt="로고이미지" width={150} className="" />
          <p className="text-center text-3xl mt-7">비밀번호 변경</p>
          <p className="text-center text-gray-600 mt-2">
            새로 등록할
            <br />
            비밀번호를 입력해주세요.
          </p>
          <div className="space-y-4 mt-10 w-10/12 mx-auto">
            <div className="flex flex-col">
              <label className="ml-2">비밀번호</label>
              <Input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="focus:ring-1 focus:ring-green-300"
              />
            </div>

            <div className="flex flex-col">
              <label className="ml-2">비밀번호 확인</label>
              <Input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="focus:ring-1 focus:ring-green-300"
              />
            </div>
          </div>

          <div className="flex flex-col items-center mt-16">
            <Button
              style={{
                hoverColor: "hover:bg-[#3CB731]",
                backgroundColor: "bg-[#6AC662]",
                width: "w-40",
              }}
              type="submit"
            >
              변경하기
            </Button>
          </div>
        </Form>
        {error && (
          <div className="absolute text-sm top-[440px] left-14 text-red-500 text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
