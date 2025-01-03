"use client";

import React from "react";
import { useForm } from "react-hook-form";
import Input from "@/app/components/common/Input";
import Button from "@/app/components/common/Button";
import Logo from "@/app/assets/Do_logo_non_text.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { mainApi } from "@/app/utils/mainApi";
import { API } from "@/app/utils/api";
import { SuccessAlert, ErrorAlert } from "@/app/utils/toastAlert";

type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({ mode: "onChange" });
  const router = useRouter();

  const onSubmit = async (formData: LoginFormData) => {
    try {
      const res = await mainApi<{ accessToken: string }>({
        url: API.AUTH.LOGIN,
        method: "POST",
        data: {
          email: formData.email,
          password: formData.password,
          role: "user",
        },
      });

      if (res.status === 201) {
        SuccessAlert("로그인 성공");
        localStorage.setItem("token", res.data.accessToken);
        router.push("/dashboard");
      }
    } catch (e) {
      console.error("로그인 실패", e);
      if (e.status === 401) {
        ErrorAlert("이메일 또는 비밀번호가 일치하지 않습니다.");
      } else if (e.status === 403) {
        ErrorAlert("관리자 권한이 존재하지 않습니다.");
      } else {
        ErrorAlert("로그인 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="flex items-center min-h-screen">
      <div className="max-w-md w-full mx-auto p-4 border rounded-md shadow-xl drop-shadow-sm h-[600px]">
        <form onSubmit={handleSubmit(onSubmit)}>
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

          <div className="space-y-4 mt-4 w-10/12 mx-auto">
            {/* 이메일 */}
            <div className="flex flex-col">
              <label className="ml-2">이메일</label>
              <Input
                type="email"
                placeholder="example@email.com"
                {...register("email", {
                  required: "이메일을 입력해주세요",
                  pattern: {
                    value:
                      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
                    message: "올바른 이메일 형식이 아닙니다",
                  },
                })}
                className="focus:ring-1 focus:ring-green-300"
              />
              {errors.email && (
                <p className="ml-1 text-red-500 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* 비밀번호 */}
            <div className="flex flex-col relative">
              <label className="ml-2">비밀번호</label>
              <Input
                type="password"
                placeholder="비밀번호를 입력하세요"
                {...register("password", {
                  required: "비밀번호를 입력해주세요",
                })}
                className="focus:ring-1 focus:ring-green-300"
              />
              {errors.password && (
                <p className="ml-1 text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
              <div className="absolute right-0 top-14">
                <Link href="/find-password" className="text-xs text-gray-500">
                  비밀번호 찾기
                </Link>
              </div>
            </div>
          </div>

          {/* 로그인 버튼 */}
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
            <Button
              style={{
                hoverColor: "hover:bg-[#3CB731]",
                backgroundColor: "bg-[#6AC662]",
                width: "w-52",
              }}
              type="submit"
              disabled={isSubmitting}
            >
              로그인
            </Button>
          </div>

          {/* 회원가입 */}
          <div className="absolute bottom-9 left-1/2 transform -translate-x-1/2 text-sm mt-1 text-gray-500 text-center">
            <Link href="/sign-up">회원가입</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
