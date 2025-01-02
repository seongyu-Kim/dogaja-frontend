"use client";

import React, { useEffect, useState } from "react";
import { FaUserEdit, FaStar, FaBookmark, FaListAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import Input from "@/app/components/common/Input";
import Button from "@/app/components/common/Button";
import { mainApi } from "@/app/utils/mainApi";
import { API } from "@/app/utils/api";
import { useUserStore } from "@/app/store/userStore";
import { ErrorAlert, SuccessAlert } from "@/app/utils/toastAlert";
import { useRouter } from "next/navigation";

interface Fav {
  id?: string;
  location: string;
  address?: string;
  phone?: string;
  isFav?: boolean;
}

// interface myPost {
//   id?: string;
//   title: string;
//   content: string;
//   type: string;
// }

const myPosts = [
  { id: 1, title: "대방어 먹고싶다", content: "서울 대방어 맛집 소개" },
  {
    id: 2,
    title: "식사 후기",
    content: "이번 주에 맛있게 먹은 회사 근처 식당들",
  },
  { id: 3, title: "겨울 여행", content: "가을에 떠나는 바다 추천" },
  { id: 3, title: "겨울 여행", content: "가을에 떠나는 바다 추천" },
  { id: 3, title: "겨울 여행", content: "가을에 떠나는 바다 추천" },
  { id: 3, title: "겨울 여행", content: "가을에 떠나는 바다 추천" },
  { id: 3, title: "겨울 여행", content: "가을에 떠나는 바다 추천" },
  { id: 3, title: "겨울 여행", content: "가을에 떠나는 바다 추천" },
];

const MyPage = () => {
  const [name, setName] = useState<string>("");
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isChangingPassword, setIsChangingPassword] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string>("");
  const [favorites, setFavorites] = useState<Fav[]>([]);
  //내가 쓴 글
  // const [myPost, setMyPost] = useState<myPost[]>([]);

  const router = useRouter();
  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
    fetchFavoritePlaces();
  }, [fetchUser]);

  useEffect(() => {
    if (user) {
      setName(user?.name || "알 수 없는 사용자");
    }
  }, [user]);

  //닉변
  const handleNameChange = async () => {
    try {
      const res = await mainApi({
        url: API.USER.NAME_UPDATE,
        method: "PUT",
        data: { name },
        withAuth: true,
      });

      if (res.status === 200) {
        setIsEditingName(false);
        await fetchUser();
        SuccessAlert("닉네임이 변경되었습니다.");
      }
    } catch (e) {
      console.log(e);
      if (e.status === 404) {
        ErrorAlert("유저를 찾을 수 없습니다.");
      } else if (e.status === 409) {
        ErrorAlert("이미 존재하는 닉네임입니다.");
      } else {
        ErrorAlert("닉네임 변경에 실패하였습니다.");
      }
    }
  };

  //비밀번호 변경
  const handlePasswordChange = async () => {
    if (!currentPassword) {
      setPasswordError("현재 비밀번호를 입력해주세요");
      return;
    }

    if (!newPassword) {
      setPasswordError("새 비밀번호를 입력해주세요");
      return;
    }

    if (newPassword.length < 8 || newPassword.length > 20) {
      setPasswordError("비밀번호는 8자 이상 20자 이하여야 합니다");
      return;
    }

    if (!confirmPassword) {
      setPasswordError("새 비밀번호 확인을 입력해주세요");
      return;
    }

    if (isChangingPassword) {
      if (newPassword !== confirmPassword) {
        setPasswordError("새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.");
        return;
      }

      try {
        const res = await mainApi({
          url: API.USER.PASSWORD_UPDATE,
          method: "PUT",
          data: {
            currentPassword,
            newPassword,
            confirmPassword,
          },
          withAuth: true,
        });

        if (res.status === 200) {
          setPasswordError("");
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
          setIsChangingPassword(false);
          SuccessAlert("비밀번호가 변경되었습니다.");
        }
      } catch (e) {
        if (e.status === 400) {
          setPasswordError("현재 비밀번호가 일치하지 않습니다.");
        } else if (e.status === 422) {
          setPasswordError("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        } else if (e.status === 404) {
          setPasswordError("유저를 찾을 수 없습니다.");
        } else {
          setPasswordError("비밀번호 변경에 실패하였습니다");
        }
      }
    }
  };

  //회원탈퇴
  const handleUserDelete = async () => {
    if (window.confirm("정말로 계정을 탈퇴하시겠습니까?")) {
      try {
        const res = await mainApi({
          url: API.USER.USER_DELETE,
          method: "DELETE",
          withAuth: true,
        });

        if (res.status === 200) {
          localStorage.removeItem("token");
          SuccessAlert("회원탈퇴가 완료되었습니다.");

          setTimeout(() => {
            router.push("/");
          }, 1200);
        }
      } catch (e) {
        if (e.status === 404) {
          ErrorAlert("유저를 찾을 수 없습니다.");
        } else {
          ErrorAlert("회원탈퇴에 실패하였습니다.");
        }
      }
    }
  };

  //내가 쓴 글
  // const fetchMyPost = async () => {
  //   try {
  //     const res = await mainApi({
  //       url: API.BOARD.MY_POST,
  //       method: "GET",
  //       withAuth: true,
  //     });

  //     setMyPost(res.data as myPost[]);
  //   } catch (e) {
  //     console.error(e);
  //     ErrorAlert("나의 게시글을 불러오는데 실패하였습니다.");
  //   }
  // };

  //즐찾 리스트
  const fetchFavoritePlaces = async () => {
    try {
      const res = await mainApi({
        url: API.BOOKMARK.BOOKMARK_ALL_GET,
        method: "GET",
        withAuth: true,
      });

      if (res.status === 200) {
        setFavorites(
          (res.data as Fav[]).map((fav) => ({ ...fav, isFav: true }))
        );
      }
    } catch (e) {
      console.error("즐찾 불러오기 실패", e);
      ErrorAlert("즐겨찾기 목록을 불러오는데 실패하였습니다.");
    }
  };
  //즐찾 해제
  const removeFavoritePlace = async (favId: string) => {
    if (!favId) return;

    try {
      const res = await mainApi({
        url: API.BOOKMARK.BOOKMARK_DELETE(favId),
        method: "DELETE",
        withAuth: true,
      });

      if (res.status === 200) {
        SuccessAlert("즐겨찾기가 삭제되었습니다.");
        await fetchFavoritePlaces();
      }
    } catch (e) {
      console.error(e);
      ErrorAlert("즐겨찾기 삭제하는데 실패하였습니다.");
    }
  };

  return (
    <div className="flex justify-center mt-2">
      <div className="flex w-full max-w-7xl p-4">
        {/* 내 정보 */}
        <div className="flex flex-col basis-1/3 p-4 space-y-4 bg-gray-200 rounded-lg shadow-md mr-4 relative">
          <h2 className="flex text-lg p-3 items-center">
            <FaUserEdit className="w-6 h-auto mr-2" /> 내 정보
          </h2>
          {/* 닉변 */}
          <div className="p-3">
            <label className="block text-gray-700">닉네임</label>
            {isEditingName ? (
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  name="nickname"
                  value={name}
                  className="pl-2"
                  onChange={(e) => setName(e.target.value)}
                />
                <Button
                  style={{
                    hoverColor: "hover:bg-[#3CB731]",
                    backgroundColor: "bg-[#6AC662]",
                    textSize: "text-sm",
                    padding: "px-3 py-1",
                  }}
                  onClick={handleNameChange}
                >
                  저장
                </Button>
                <Button
                  style={{
                    hoverColor: "hover:bg-[#FF3A3E]",
                    backgroundColor: "bg-[#E03437]",
                    textSize: "text-sm",
                    padding: "px-3 py-1",
                  }}
                  onClick={() => {
                    setIsEditingName(false);
                    setName(user?.name || "알 수 없는 사용자");
                  }}
                >
                  닫기
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span>{name || "알 수 없는 사용자"}</span>
                <Button
                  style={{
                    hoverColor: "hover:bg-[#3CB731]",
                    backgroundColor: "bg-[#6AC662]",
                    textSize: "text-sm",
                    padding: "px-3 py-1",
                  }}
                  onClick={() => setIsEditingName(true)}
                >
                  <MdEdit className="w-5 h-auto" />
                </Button>
              </div>
            )}
          </div>

          {/* 비밀번호 변경 */}
          <div className="p-3">
            <label className="block text-gray-700">비밀번호 변경</label>
            {!isChangingPassword ? (
              <Button
                style={{
                  hoverColor: "hover:bg-[#3CB731]",
                  backgroundColor: "bg-[#6AC662]",
                  textSize: "text-sm",
                  padding: "px-3 py-1",
                }}
                onClick={() => setIsChangingPassword(true)}
              >
                비밀번호 변경
              </Button>
            ) : (
              <div className="flex flex-col space-y-2">
                <Input
                  type="password"
                  name="password"
                  placeholder="현재 비밀번호"
                  value={currentPassword}
                  className="pl-2"
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <Input
                  type="password"
                  name="newPassword"
                  placeholder="새 비밀번호"
                  value={newPassword}
                  className="pl-2"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="새 비밀번호 확인"
                  value={confirmPassword}
                  className="pl-2"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {passwordError && (
                  <p className="text-red-500 text-sm">{passwordError}</p>
                )}
                <div className="flex justify-center gap-2">
                  <Button
                    style={{
                      hoverColor: "hover:bg-[#3CB731]",
                      backgroundColor: "bg-[#6AC662]",
                      textSize: "text-sm",
                      padding: "px-3 py-1",
                    }}
                    onClick={handlePasswordChange}
                  >
                    변경
                  </Button>
                  <Button
                    style={{
                      hoverColor: "hover:bg-[#FF3A3E]",
                      backgroundColor: "bg-[#E03437]",
                      textSize: "text-sm",
                      padding: "px-3 py-1",
                    }}
                    onClick={() => {
                      setIsChangingPassword(false);
                      setCurrentPassword("");
                      setNewPassword("");
                      setConfirmPassword("");
                    }}
                  >
                    닫기
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* 탈퇴하기 버튼 */}
          <div className="absolute bottom-4 right-4">
            <Button
              className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1"
              onClick={handleUserDelete}
            >
              탈퇴하기
            </Button>
          </div>
        </div>

        {/* 오른쪽 */}
        <div className="flex flex-col basis-2/3 space-y-4">
          {/* 내가 작성한 글 */}
          <div className="bg-gray-200 rounded-lg shadow-md h-[45vh] overflow-hidden">
            <h2 className="flex text-lg p-3 items-center">
              <FaListAlt className="w-5 h-auto mr-2" /> 내가 작성한 글
            </h2>
            <div className="p-3 h-[calc(100%-3rem)] overflow-y-auto">
              {myPosts.length > 0 ? (
                <ul>
                  {myPosts.map((post) => (
                    <li
                      key={post.id}
                      className="mb-4 border-b border-black pb-4"
                    >
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
          <div className="bg-gray-200 rounded-lg shadow-md h-[45vh] overflow-hidden">
            <h2 className="flex text-lg p-3 items-center">
              <FaBookmark className="w-5 h-auto mr-2" /> 즐겨찾기
            </h2>
            <div className="p-3 h-[calc(100%-3rem)] overflow-y-auto">
              {favorites.length > 0 ? (
                <ul>
                  {favorites.map((fav) => (
                    <li
                      key={fav.id}
                      className="mb-4 border-b border-black flex justify-between items-center pb-4"
                    >
                      <div>
                        <h3 className="text-lg">{fav.location}</h3>
                        <p>{fav.address}</p>
                        <p className="text-sm">
                          {fav.phone || "번호를 제공하지 않는 장소입니다."}
                        </p>
                      </div>
                      <div className="mr-2">
                        <FaStar
                          className={`cursor-pointer w-6 h-auto ${fav.isFav ? "text-yellow-500" : ""}`}
                          onClick={() => removeFavoritePlace(fav.id!)}
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
