"use client";

import React from "react";
import { useForm } from "react-hook-form";
import Input from "@/app/components/common/Input";
import Button from "@/app/components/common/Button";
import Logo from "@/app/assets/Do_logo_non_text.png";
import Image from "next/image";
import { mainApi } from "@/app/utils/mainApi";
import { API } from "@/app/utils/api";
import { SuccessAlert, ErrorAlert } from "@/app/utils/toastAlert";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";

type SignUpFormData = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({ mode: "onChange" });

  const router = useRouter();

  const onSubmit = async (formData: SignUpFormData) => {
    try {
      const res = await mainApi({
        url: API.USER.SIGNUP,
        method: "POST",
        data: {
          email: formData.email,
          name: formData.name,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        },
      });

      if (res.status === 201) {
        SuccessAlert("회원가입 성공");
        setTimeout(() => {
          router.push("/login");
        }, 1200);
      }
    } catch (e) {
      if (isAxiosError(e)) {
        if (e.status === 409) {
          ErrorAlert("이미 존재하는 이메일입니다.");
        } else if (e.status === 422) {
          ErrorAlert("이미 존재하는 이름입니다.");
        } else {
          ErrorAlert("회원가입에 실패하였습니다.");
        }
      }
    }
  };

  return (
    <div className="flex items-center min-h-screen">
      <div className="max-w-md w-full mx-auto p-4 border rounded-md shadow-xl drop-shadow-sm relative h-[600px]">
        <Image src={Logo} alt="로고이미지" width={150} className="" />
        <form onSubmit={handleSubmit(onSubmit)} className="mb-20">
          <p className="text-center text-3xl mt-7">회원가입</p>
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

            {/* 이름 */}
            <div className="flex flex-col">
              <label className="ml-2">이름</label>
              <Input
                type="text"
                placeholder="사용할 이름을 입력하세요."
                {...register("name", {
                  required: "이름을 입력해주세요",
                  minLength: {
                    value: 3,
                    message: "이름은 3자 이상이어야 합니다",
                  },
                  maxLength: {
                    value: 15,
                    message: "이름은 15자 이하여야 합니다",
                  },
                })}
                className="focus:ring-1 focus:ring-green-300"
              />
              {errors.name && (
                <p className="ml-1 text-red-500 text-sm">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* 비밀번호 */}
            <div className="flex flex-col">
              <label className="ml-2">비밀번호</label>
              <Input
                type="password"
                placeholder="비밀번호를 입력하세요."
                {...register("password", {
                  required: "비밀번호를 입력해주세요",
                  minLength: {
                    value: 8,
                    message: "비밀번호는 8자 이상이어야 합니다",
                  },
                  maxLength: {
                    value: 20,
                    message: "비밀번호는 20자 이하여야 합니다",
                  },
                })}
                className="focus:ring-1 focus:ring-green-300"
              />
              {errors.password && (
                <p className="ml-1 text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* 비밀번호 확인 */}
            <div className="flex flex-col">
              <label className="ml-2">비밀번호 확인</label>
              <Input
                type="password"
                placeholder="비밀번호를 다시 입력하세요."
                {...register("confirmPassword", {
                  required: "비밀번호 확인을 입력해주세요",
                  validate: (value) =>
                    value === watch("password") ||
                    "비밀번호가 일치하지 않습니다",
                })}
                className="focus:ring-1 focus:ring-green-300"
              />
              {errors.confirmPassword && (
                <p className="ml-1 text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
            <Button
              style={{
                hoverColor: "hover:bg-[#3CB731]",
                backgroundColor: "bg-[#6AC662]",
                width: "w-40",
              }}
              type="submit"
              disabled={isSubmitting}
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
