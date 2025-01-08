"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "@/app/components/common/Input";
import Button from "@/app/components/common/Button";
import Logo from "@/app/assets/Do_logo_non_text.png";
import Image from "next/image";
import Link from "next/link";
import { mainApi } from "@/app/utils/mainApi";
import { API } from "@/app/utils/api";
import { ErrorAlert, SuccessAlert } from "@/app/utils/toastAlert";
import { isAxiosError } from "axios";

type FindPasswordFormData = {
  email: string;
};

const FindPassword: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FindPasswordFormData>({ mode: "onChange" });

  const onSubmit = async (data: FindPasswordFormData) => {
    const { email } = data;

    try {
      const res = await mainApi({
        url: API.AUTH.RESET_PASSWORD_REQUEST,
        method: "POST",
        data: { email },
      });

      if (res.status === 201) {
        setMessage("등록하신 이메일로 재설정 링크가 발송되었습니다.");
        SuccessAlert("메일이 발송되었습니다.");
        reset();
      }
    } catch (e) {
      if (isAxiosError(e)) {
        if (e.status === 404) {
          ErrorAlert("등록되지 않은 이메일입니다.");
        }
      }
    }
  };

  return (
    <div className="flex items-center min-h-screen">
      <div className="max-w-md w-full mx-auto p-4 border rounded-md shadow-xl drop-shadow-sm h-[600px] relative">
        <form onSubmit={handleSubmit(onSubmit)}>
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
              <div className="relative flex flex-col mt-12">
                <label className="ml-2">이메일</label>
                <Input
                  type="email"
                  placeholder="example@email.com"
                  {...register("email", {
                    required: "이메일을 입력해주세요.",
                    pattern: {
                      value:
                        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
                      message: "올바른 이메일 형식이 아닙니다.",
                    },
                  })}
                  className="focus:ring-1 focus:ring-green-300 placeholder:text-sm"
                />
                {errors.email && (
                  <p className="absolute top-16 ml-1 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
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
                disabled={isSubmitting}
              >
                메일 보내기
              </Button>
            </div>
          )}

          <div className="text-sm mt-1 text-gray-500 text-center">
            <Link href="/login">로그인 페이지로 돌아가기</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FindPassword;
