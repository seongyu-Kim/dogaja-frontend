"use client";

import React, { useState } from "react";
import Input from "@/app/components/common/Input";
import Button from "@/app/components/common/Button";
import Logo from "@/app/assets/Do_logo_non_text.png";
import Image from "next/image";
import Link from "next/link";
import { mainApi } from "@/app/utils/mainApi";
import { API } from "@/app/utils/api";

const FindPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("이메일을 입력해주세요.");
      return;
    }

    setLoading(true);

    try {
      const res = await mainApi({
        url: API.AUTH.RESET_PASSWORD_REQUEST,
        method: "POST",
        data: { email },
      });

      if (res.status === 201) {
        setMessage("등록하신 이메일로 재설정 링크가 발송되었습니다.");
        setEmail("");
        setError("");
      }
    } catch (e) {
      if (e.status === 404) {
        setError("등록되지 않은 이메일입니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center min-h-screen">
      <div className="max-w-md w-full mx-auto p-4 border rounded-md shadow-xl drop-shadow-sm h-[600px] relative">
        <form onSubmit={handleSubmit}>
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
          {error && (
            <div className="ml-9 mt-1 text-sm text-red-500">{error}</div>
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
                disabled={loading}
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
