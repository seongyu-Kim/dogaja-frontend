"use client";

import React, { useState } from "react";
import { FaUserEdit, FaStar, FaBookmark, FaListAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import Input from "@/app/components/common/Input";
import Button from "@/app/components/common/Button";

const myPosts = [
  { id: 1, title: "대방어 먹고싶다", content: "서울 대방어 맛집 소개" },
  {
    id: 2,
    title: "식사 후기",
    content: "이번 주에 맛있게 먹은 회사 근처 식당들",
  },
  { id: 3, title: "겨울 여행", content: "가을에 떠나는 바다 추천" },
];

const initialFavoritePosts = [
  {
    id: 1,
    title: "망원한강공원",
    content: "추가적으로 들어갈 내용........",
    isChecked: false,
  },
  {
    id: 2,
    title: "연남동",
    content: "메모메모.....",
    isChecked: false,
  },
];

const MyPage = () => {
  const [nickname, setNickname] = useState<string>("사용자");
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [isEditingNickname, setIsEditingNickname] = useState<boolean>(false);
  const [isPasswordVerified, setIsPasswordVerified] = useState<boolean>(false);
  const [favoritePosts, setFavoritePosts] = useState(initialFavoritePosts);
  const [passwordError, setPasswordError] = useState<string>("");

  const handleNicknameEdit = () => {
    setIsEditingNickname(true);
  };

  const handleNicknameSave = () => {
    setIsEditingNickname(false);
  };

  const handlePasswordVerification = () => {
    if (password === "test") {
      setIsPasswordVerified(true);
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  const handlePasswordChange = () => {
    if (isPasswordVerified) {
      if (newPassword !== confirmNewPassword) {
        setPasswordError("새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.");
        return;
      }

      setPasswordError("");
      alert("비밀번호가 변경되었습니다.");
      setPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setIsPasswordVerified(false);
    }
  };

  const toggleFavoriteChecked = (id: number) => {
    setFavoritePosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, isChecked: !post.isChecked } : post
      )
    );
  };

  const handleAccountDeletion = () => {
    if (window.confirm("정말로 계정을 탈퇴하시겠습니까?")) {
      alert("계정이 탈퇴되었습니다.");
    }
  };

  return (
    <div className="flex justify-center min-h-[calc(92vh)]">
      <div className="flex w-full max-w-7xl p-4">
        {/* 내 정보 */}
        <div className="flex flex-col flex-grow basis-1/3 p-4 space-y-4 bg-gray-200 rounded-lg shadow-md mr-4 relative">
          <h2 className="flex text-lg p-3 items-center">
            <FaUserEdit className="w-6 h-auto mr-2" /> 내 정보
          </h2>
          {/* 닉변 */}
          <div className="p-3">
            <label className="block text-gray-700">닉네임</label>
            {isEditingNickname ? (
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  name="nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
                <Button
                  className="bg-[#36A42C] hover:bg-[#3CB731] text-white"
                  onClick={handleNicknameSave}
                >
                  저장
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span>{nickname}</span>
                <Button
                  className="bg-[#36A42C] hover:bg-[#3CB731] text-white"
                  onClick={handleNicknameEdit}
                >
                  <MdEdit className="w-5 h-auto" />
                </Button>
              </div>
            )}
          </div>

          {/* 비밀번호 */}
          <div className="p-3">
            <label className="block text-gray-700">비밀번호 인증</label>
            <div className="flex items-center space-x-2">
              <Input
                type="password"
                name="password"
                placeholder="현재 비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                className="bg-[#36A42C] hover:bg-[#3CB731] text-white"
                onClick={handlePasswordVerification}
              >
                확인
              </Button>
            </div>
          </div>

          {isPasswordVerified && (
            <div className="p-3">
              <label className="block text-gray-700">새 비밀번호</label>
              <div className="flex items-center space-x-2">
                <Input
                  type="password"
                  name="password"
                  placeholder="새 비밀번호"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <label className="block text-gray-700 mt-3">
                새 비밀번호 확인
              </label>
              <div className="flex items-center space-x-2">
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="새 비밀번호 확인"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </div>

              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}

              <Button
                className="bg-[#36A42C] hover:bg-[#3CB731] text-white mt-4"
                onClick={handlePasswordChange}
              >
                변경
              </Button>
            </div>
          )}

          {/* 탈퇴하기 버튼 */}
          <div className="absolute bottom-4 right-4">
            <Button
              className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2"
              onClick={handleAccountDeletion}
            >
              탈퇴하기
            </Button>
          </div>
        </div>

        {/* 오른쪽 */}
        <div className="flex flex-col flex-grow basis-2/3 space-y-4">
          {/* 내가 쓴 글 */}
          <div className="bg-gray-200 rounded-lg shadow-md flex-grow">
            <h2 className="flex text-lg p-3 items-center">
              <FaListAlt className="w-5 h-auto mr-2" /> 내가 작성한 글
            </h2>
            <div className="p-3">
              {myPosts.length > 0 ? (
                <ul>
                  {myPosts.map((post) => (
                    <li key={post.id} className="mb-4 border-b border-black">
                      <h3 className="text-lg">{post.title}</h3>
                      <p>{post.content}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>작성한 글이 없습니다.</p>
              )}
            </div>
          </div>

          {/* 즐찾 */}
          <div className="bg-gray-200 rounded-lg shadow-md flex-grow">
            <h2 className="flex text-lg p-3 items-center">
              <FaBookmark className="w-5 h-auto mr-2" /> 즐겨찾기
            </h2>
            <div className="p-3">
              {favoritePosts.length > 0 ? (
                <ul>
                  {favoritePosts.map((post) => (
                    <li
                      key={post.id}
                      className="mb-4 border-b border-black flex justify-between items-center"
                    >
                      <div>
                        <h3 className="text-lg">{post.title}</h3>
                        <p>{post.content}</p>
                      </div>
                      <div className="mr-2">
                        <FaStar
                          className={`cursor-pointer w-6 h-auto ${post.isChecked ? "text-yellow-500" : ""}`}
                          onClick={() => toggleFavoriteChecked(post.id)}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>즐겨찾기한 글이 없습니다.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
