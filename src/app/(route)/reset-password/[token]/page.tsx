"use client";

import React from "react";
import { useForm } from "react-hook-form";
import Input from "@/app/components/common/Input";
import Button from "@/app/components/common/Button";
import Logo from "@/app/assets/Do_logo_non_text.png";
import Image from "next/image";
import { mainApi } from "@/app/utils/mainApi";
import { API } from "@/app/utils/api";
import { useRouter } from "next/navigation";
import { ErrorAlert, SuccessAlert } from "@/app/utils/toastAlert";
import { isAxiosError } from "axios";

type ResetPasswordFormData = {
  newPassword: string;
  confirmPassword: string;
};

const ResetPassword = ({ params }: { params: { token: string } }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ResetPasswordFormData>({ mode: "onChange" });
  const token = params.token;
  const router = useRouter();

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (data.newPassword !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "비밀번호 확인이 일치하지 않습니다",
      });
      return;
    }

    try {
      const res = await mainApi({
        url: API.AUTH.RESET_PASSWORD(token),
        method: "PUT",
        data: {
          newPassword: data.newPassword,
          confirmPassword: data.confirmPassword,
        },
      });

      if (res.status === 200) {
        SuccessAlert("비밀번호 변경 성공");

        setTimeout(() => {
          router.push("/login");
        }, 1200);
      }
    } catch (e) {
      if (isAxiosError(e)) {
        if (e.status === 400) {
          ErrorAlert("유효하지 않은 토큰입니다.");
        } else {
          ErrorAlert("비밀번호 변경 실패");
        }
      }
    }
  };

  return (
    <div className="flex items-center min-h-screen">
      <div className="max-w-md w-full mx-auto p-4 border rounded-md shadow-xl drop-shadow-sm h-[600px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Image src={Logo} alt="로고이미지" width={150} className="" />
          <p className="text-center text-3xl mt-7">비밀번호 변경</p>
          <p className="text-center text-gray-600 mt-2">
            새로 등록할
            <br />
            비밀번호를 입력해주세요.
          </p>
          <div className="space-y-4 mt-10 w-10/12 mx-auto">
            {/* 비밀번호 입력 */}
            <div className="flex flex-col">
              <label className="ml-2">비밀번호</label>
              <Input
                type="password"
                placeholder="새 비밀번호"
                {...register("newPassword", {
                  required: "비밀번호를 입력해주세요",
                  minLength: {
                    value: 8,
                    message: "비밀번호는 최소 8자 이상이어야 합니다",
                  },
                })}
                className="focus:ring-1 focus:ring-green-300"
              />
              {errors.newPassword && (
                <p className="ml-1 text-red-500 text-sm mt-1">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            {/* 비밀번호 확인 */}
            <div className="flex flex-col">
              <label className="ml-2">비밀번호 확인</label>
              <Input
                type="password"
                placeholder="비밀번호 확인"
                {...register("confirmPassword", {
                  required: "비밀번호 확인을 입력해주세요",
                })}
                className="focus:ring-1 focus:ring-green-300"
              />
              {errors.confirmPassword && (
                <p className="ml-1 text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
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
              disabled={isSubmitting}
            >
              변경하기
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
