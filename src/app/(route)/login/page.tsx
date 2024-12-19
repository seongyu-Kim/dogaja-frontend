"use client";

import React, { useState } from "react";
import Form from "@/app/components/common/Form";
import Input from "@/app/components/common/Input";
import Button from "@/app/components/common/Button";
import Logo from "@/app/assets/Do_logo_non_text.png";
import Image from "next/image";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logged in with:", email, password);
  };

  return (
    <div className="flex items-center min-h-screen">
      <div className="max-w-md w-full mx-auto p-4 border rounded-md shadow-md min-h-[600px]">
        <Form onSubmit={handleSubmit}>
          <Image
            src={Logo}
            alt="로고이미지"
            width={150}
            className="mx-auto mt-24"
          />
          <p className="text-center">
            로그인하고 두가자와
            <br />
            함께 여행을 계획해 보세요
          </p>
          <div className="space-y-4">
            <div>
              <label className="ml-2">이메일</label>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label>비밀번호</label>
              <Input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-center" style={{ marginTop: "5rem" }}>
            <Button
              style={{
                hoverColor: "hover:bg-[#3CB731]",
                backgroundColor: "bg-[#6AC662]",
                width: "w-40",
              }}
              type="submit"
            >
              로그인
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
