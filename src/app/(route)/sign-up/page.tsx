"use client";

import React, { useState } from "react";
import Form from "@/app/components/common/Form";
import Input from "@/app/components/common/Input";
import Button from "@/app/components/common/Button";
import Logo from "@/app/assets/Do_logo_non_text.png";
import Image from "next/image";
// import { mainApi } from "@/app/utils/mainApi";

const SignUp: React.FC = () => {
  const [info, setInfo] = useState({
    email: "",
    nickname: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailPattern =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

    if (!info.email) {
      setError("이메일을 입력해주세요");
      return;
    }

    if (!emailPattern.test(info.email)) {
      setError("올바른 이메일 형식이 아닙니다");
      return;
    }

    if (!info.nickname) {
      setError("닉네임을 입력해주세요");
      return;
    }

    if (info.nickname.length < 3 || info.nickname.length > 15) {
      setError("닉네임은 3자 이상 15자 이하여야 합니다");
      return;
    }

    if (!info.password) {
      setError("비밀번호를 입력해주세요");
      return;
    }

    if (info.password.length < 6 || info.password.length > 20) {
      setError("비밀번호는 6자 이상 20자 이하여야 합니다");
      return;
    }

    if (info.password !== info.confirmPassword) {
      setError("비밀번호 확인이 일치하지 않습니다");
      return;
    }

    setError(null);

    // try {
    //   const res = await mainApi({
    //     url: "api/signup",
    //     method: "POST",
    //     data: {
    //       email: info.email,
    //       nickname: info.nickname,
    //       password: info.password,
    //     },
    //   });

    //   if (response.status === 200) {
    //     console.log("회원가입 성공");
    //     //로그인 페이지로 이동
    //     //토스티파이 회원가입 성공알림
    //   }
    // } catch (e) {
    //   console.error("회원가입 실패", e);
    // }
  };

  return (
    <div className="flex items-center min-h-screen">
      <div className="max-w-md w-full mx-auto p-4 border rounded-md shadow-xl drop-shadow-sm h-[600px]">
        <Form onSubmit={handleSubmit}>
          <Image src={Logo} alt="로고이미지" width={150} className="" />
          <p className="text-center text-3xl mt-7">회원가입</p>
          <div className="space-y-4 mt-4 w-10/12 mx-auto">
            <div className="flex flex-col">
              <label className="ml-2">이메일</label>
              <Input
                type="string"
                name="email"
                value={info.email}
                onChange={handleChange}
                className="focus:ring-1 focus:ring-green-300"
              />
            </div>

            <div className="flex flex-col">
              <label className="ml-2">닉네임</label>
              <Input
                type="text"
                name="nickname"
                value={info.nickname}
                onChange={handleChange}
                className="focus:ring-1 focus:ring-green-300"
              />
            </div>

            <div className="flex flex-col">
              <label className="ml-2">비밀번호</label>
              <Input
                type="password"
                name="password"
                value={info.password}
                onChange={handleChange}
                className="focus:ring-1 focus:ring-green-300"
              />
            </div>

            <div className="flex flex-col">
              <label className="ml-2">비밀번호 확인</label>
              <Input
                type="password"
                name="confirmPassword"
                value={info.confirmPassword}
                onChange={handleChange}
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
              회원가입
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

export default SignUp;
