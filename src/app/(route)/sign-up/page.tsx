"use client";

import React, { useState } from "react";
import Input from "@/app/components/common/Input";
import Button from "@/app/components/common/Button";
import Logo from "@/app/assets/Do_logo_non_text.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { mainApi } from "@/app/utils/mainApi";
import { API } from "@/app/utils/api";
import { SuccessAlert } from "@/app/utils/toastAlert";

const SignUp: React.FC = () => {
  const [info, setInfo] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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

    if (!info.name) {
      setError("닉네임을 입력해주세요");
      return;
    }

    if (info.name.length < 3 || info.name.length > 15) {
      setError("닉네임은 3자 이상 15자 이하여야 합니다");
      return;
    }

    if (!info.password) {
      setError("비밀번호를 입력해주세요");
      return;
    }

    if (info.password.length < 8 || info.password.length > 20) {
      setError("비밀번호는 8자 이상 20자 이하여야 합니다");
      return;
    }

    if (info.password !== info.confirmPassword) {
      setError("비밀번호 확인이 일치하지 않습니다");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const res = await mainApi({
        url: API.USER.SIGNUP,
        method: "POST",
        data: {
          email: info.email,
          name: info.name,
          password: info.password,
          confirmPassword: info.confirmPassword,
        },
      });

      if (res.status === 201) {
        console.log("회원가입 성공");
        SuccessAlert("회원가입 성공");

        setTimeout(() => {
          router.push("/login");
        }, 1200);
      }

      //
    } catch (e: unknown) {
      console.error("회원가입 실패", e);
      if (e.status === 409) {
        setError("이미 존재하는 이메일입니다.");
      } else {
        setError("회원가입에 실패하였습니다");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center min-h-screen">
      <div className="max-w-md w-full mx-auto p-4 border rounded-md shadow-xl drop-shadow-sm h-[600px]">
        <form onSubmit={handleSubmit}>
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
                name="name"
                value={info.name}
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
          {error && (
            <div className="ml-9 mt-1 text-sm text-red-500 ">{error}</div>
          )}

          <div className="flex flex-col items-center mt-16">
            <Button
              style={{
                hoverColor: "hover:bg-[#3CB731]",
                backgroundColor: "bg-[#6AC662]",
                width: "w-40",
              }}
              type="submit"
              disabled={isLoading}
            >
              회원가입
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
