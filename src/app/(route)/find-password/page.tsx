"use client";

import React, { useState } from "react";
import Form from "@/app/components/common/Form";
import Input from "@/app/components/common/Input";
import Button from "@/app/components/common/Button";
import Logo from "@/app/assets/Do_logo_non_text.png";
import Image from "next/image";
import Link from "next/link";

const FindPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("이메일을 입력해주세요.");
      return;
    }

    if (email !== "test") {
      setError("등록되지 않은 이메일입니다.");
      return;
    }

    setMessage("등록하신 메일로 재설정 링크가 발송되었습니다.");
    setEmail("");
    setError("");
  };

  return (
    <div className="flex items-center min-h-screen">
      <div className="max-w-md w-full mx-auto p-4 border rounded-md shadow-xl drop-shadow-sm h-[600px] relative">
        <Form onSubmit={handleSubmit}>
          <Image src={Logo} alt="로고이미지" width={150} />
          <p className="text-center text-3xl mt-7">비밀번호 찾기</p>
          <p className="text-center text-gray-600 mt-2">
            비밀번호를 잊으셨나요? <br />
            이메일을 입력하고 재설정 링크를 받아보세요
          </p>

          {message && (
            <div className="text-sm text-center text-green-500 mt-28">
              {message}
            </div>
          )}

          {!message && (
            <div className="mt-4 w-10/12 mx-auto">
              <div className="flex flex-col mt-12">
                <label className="ml-2">이메일</label>
                <Input
                  type="string"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="focus:ring-1 focus:ring-green-300"
                />
              </div>
            </div>
          )}

          {!message && (
            <div className="flex flex-col items-center mt-28">
              <Button
                style={{
                  hoverColor: "hover:bg-[#3CB731]",
                  backgroundColor: "bg-[#6AC662]",
                  width: "w-52",
                }}
                type="submit"
              >
                메일 보내기
              </Button>
            </div>
          )}

          <div className="text-sm mt-1 text-gray-500 text-center">
            <Link href="/login">로그인 페이지로 돌아가기</Link>
          </div>
        </Form>

        {error && (
          <div className="absolute text-sm top-[340px] left-14 text-red-500 text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default FindPassword;
