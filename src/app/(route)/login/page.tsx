"use client";

import React, { useState } from "react";
import Form from "@/app/components/common/Form";
import Input from "@/app/components/common/Input";
import Button from "@/app/components/common/Button";
import Logo from "@/app/assets/Do_logo_non_text.png";
import Image from "next/image";
import Link from "next/link";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("이메일을 입력해주세요.");
      return;
    }
    if (!password) {
      setError("비밀번호를 입력해주세요.");
      return;
    }

    if (email !== "example" || password !== "1234") {
      setError("이메일 혹은 비밀번호가 일치하지 않습니다.");
      return;
    }

    setError(null);
    console.log("로그인 성공");
  };

  return (
    <div className="flex items-center min-h-screen">
      <div className="max-w-md w-full mx-auto p-4 border rounded-md shadow-xl drop-shadow-sm h-[600px] relative">
        <Form onSubmit={handleSubmit}>
          <Image
            src={Logo}
            alt="로고이미지"
            width={150}
            className="mx-auto mt-24"
          />
          <p className="text-center text-gray-600 mt-2">
            로그인하고 두가자와
            <br />
            함께 여행을 계획해 보세요(대충 설명 or 슬로건)
          </p>

          {/* <div className="space-y-4 mt-4 w-10/12 mx-auto">
            <div className="flex flex-col">
              <label className="ml-2">이메일</label>
              <Input
                type="string"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="focus:ring-1 focus:ring-green-300"
              />
            </div>

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
            <Link
              href="/reset-password"
              className="text-xs mr-1 mt-1 text-gray-500 text-right"
            >
              비밀번호 찾기
            </Link>
          </div> */}
          <div className="space-y-4 mt-4 w-10/12 mx-auto">
            <div className="flex flex-col">
              <label className="ml-2">이메일</label>
              <Input
                type="string"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="focus:ring-1 focus:ring-green-300"
              />
            </div>

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

            <div className="flex justify-end">
              <Link
                href="/reset-password"
                className="text-xs text-gray-500 mr-1 -mt-2"
              >
                비밀번호 찾기
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center mt-16">
            <Button
              style={{
                hoverColor: "hover:bg-[#3CB731]",
                backgroundColor: "bg-[#6AC662]",
                width: "w-52",
              }}
              type="submit"
            >
              로그인
            </Button>
          </div>

          <div className="text-sm mt-1 text-gray-500 text-center">
            <Link href="/sign-up">회원가입</Link>
          </div>
        </Form>
        {error && (
          <div className="absolute text-sm top-[380px] left-14 text-red-500 text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
