"use client";

import React, { useState } from "react";
import Input from "@/app/components/common/Input";
import Button from "@/app/components/common/Button";
import Logo from "@/app/assets/Do_logo_non_text.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { mainApi } from "@/app/utils/mainApi";
import { API } from "@/app/utils/api";
import { SuccessAlert } from "@/app/utils/toastAlert";
import { useUserStore } from "@/app/store/userStore";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { fetchUser } = useUserStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailPattern =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

    if (!email) {
      setError("이메일을 입력해주세요.");
      return;
    }

    if (!emailPattern.test(email)) {
      setError("올바르지 않은 이메일 형식입니다");
      return;
    }
    if (!password) {
      setError("비밀번호를 입력해주세요.");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const res = await mainApi<{ accessToken: string }>({
        url: API.AUTH.LOGIN,
        method: "POST",
        data: { email, password, role: "user" },
      });

      if (res.status === 201) {
        SuccessAlert("로그인 성공");
        localStorage.setItem("token", res.data.accessToken);
        await fetchUser();
        router.push("/dashboard");
      }
    } catch (e) {
      console.error("로그인 실패", e);
      if (e.status === 401) {
        setError("등록되지 않은 사용자입니다.");
      } else if (e.status === 404) {
        setError("비밀번호가 일치하지 않습니다.");
      } else {
        setError("로그인 중 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center min-h-screen">
      <div className="max-w-md w-full mx-auto p-4 border rounded-md shadow-xl drop-shadow-sm h-[600px] relative">
        <form onSubmit={handleSubmit}>
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
                href="/find-password"
                className="text-xs text-gray-500 mr-1 -mt-2"
              >
                비밀번호 찾기
              </Link>
            </div>
          </div>
          {error && (
            <div className="ml-9 -mt-4 text-sm text-red-500">{error}</div>
          )}

          <div className="flex flex-col items-center mt-16">
            <Button
              style={{
                hoverColor: "hover:bg-[#3CB731]",
                backgroundColor: "bg-[#6AC662]",
                width: "w-52",
              }}
              type="submit"
              disabled={isLoading}
            >
              로그인
            </Button>
          </div>

          <div className="text-sm mt-1 text-gray-500 text-center">
            <Link href="/sign-up">회원가입</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
