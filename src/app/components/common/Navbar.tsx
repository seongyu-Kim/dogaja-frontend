"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { API } from "@/app/utils/api";
import { mainApi } from "@/app/utils/mainApi";
import { SuccessAlert, ErrorAlert } from "@/app/utils/toastAlert";
import Logo from "@/app/assets/Do_logo_non_text.png";
import { FaRegAddressBook } from "react-icons/fa6";
import { PiBellBold } from "react-icons/pi";
import SlideMenu from "./Slidemenu";
import AddressBookModal from "../AddressBookModal";
import RequestModal from "../RequestModal";
import NotificationList, { Notification } from "../NotificationList";
import { useUserStore } from "@/app/store/userStore";

interface UserInfoResponse {
  name: string;
}

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  const [showAddressBookModal, setShowAddressBookModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);
  const [name, setName] = useState<string>("");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { resetUser, user } = useUserStore();

  useEffect(() => {
    // getUserName();
    getFriendRequests();

    // 임시 로그인 상태 설정
    // setIsLoggedIn(true);
    // setName("elice");
  }, []);

  useEffect(() => {
    if (!user) {
      setIsLoggedIn(false);
      setName("");
      return;
    }
    setName(user.name);
    setIsLoggedIn(true);
    // SuccessAlert(`${user.name}님 반갑습니다!`); // 계속 뜨는 문제가 있음 나중에 처리
  }, [user]);

  // const getUserName = async () => {
  //   //임시 - 유저 정보 없으면 API 호출 불가
  //   if (!user) return;
  //   const { MY_INFO_GET } = API.USER;
  //   try {
  //     const res = await mainApi<UserInfoResponse>({
  //       url: MY_INFO_GET,
  //       method: "GET",
  //       withAuth: true,
  //     });
  //     if (res.status === 200) {
  //       const userName = res.data.name;
  //       setName(userName);
  //       setIsLoggedIn(true);
  //       SuccessAlert(`${userName}님 반갑습니다!`);
  //     }
  //   } catch (e) {
  //     console.error(e);
  //     setIsLoggedIn(false);
  //     ErrorAlert("이름 가져오기에 실패했습니다.");
  //   }
  // };

  const getFriendRequests = async () => {
    //임시 - 유저 정보 없으면 API 호출 불가
    if (!user) return;
    const { FRIENDS_REQUEST_GET } = API.FRIENDS;
    try {
      const res = await mainApi({
        url: FRIENDS_REQUEST_GET,
        method: "GET",
        withAuth: true,
      });
      if (res.status === 200) {
        setNotifications(res.data.requests);
      }
    } catch (e) {
      console.error(e);
      ErrorAlert("친구요청 가져오기에 실패했습니다.");
    }
  };

  const handleLogout = async () => {
    const { LOGOUT } = API.AUTH;
    try {
      const res = await mainApi({
        url: LOGOUT,
        method: "POST",
        withAuth: true,
      });
      if (res.status === 201) {
        localStorage.removeItem("token");
        resetUser();
        setIsLoggedIn(false);
        router.replace("/");
        SuccessAlert("로그아웃 되었습니다.");
      }
    } catch (e) {
      console.error(e);
      ErrorAlert("로그아웃에 실패했습니다.");
    }
  };

  const toggleNotifications = () => setShowNotifications((prev) => !prev);
  const toggleLogoutMenu = () => setShowLogoutMenu((prev) => !prev);
  const openAddressBookModal = () => setShowAddressBookModal((prev) => !prev);

  const handleNotificationClick = (notification: Notification) => {
    // 초대 알림 클릭 시 /post/{id}로 이동
    router.push(`/post/${notification.id}`);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 w-full border-b-4 border-mainColor text-white p-4 flex justify-between items-center bg-white">
      <div>
        <Link href="/" passHref>
          <Image src={Logo} alt="Logo" width={50} height={50} />
        </Link>
      </div>

      {user ? (
        <ul className="flex gap-3">
          <li className="cursor-pointer" onClick={openAddressBookModal}>
            <FaRegAddressBook className="text-mainColor text-2xl hover:scale-105 transition-all duration-300 ease-in-out" />
          </li>
          <li className="relative">
            <button
              className="cursor-pointer text-mainColor text-2xl focus:outline-none"
              onClick={toggleNotifications}
            >
              <PiBellBold className="hover:scale-105 transition-all duration-300 ease-in-out" />
            </button>
            {showNotifications && (
              <div className="absolute right-0 w-60 mt-4">
                <NotificationList
                  notifications={notifications}
                  onNotificationClick={handleNotificationClick}
                />
              </div>
            )}
          </li>
          <li
            className="mr-2 hover:underline cursor-pointer text-mainColor font-bold hover:scale-105 transition-all duration-300 ease-in-out"
            onClick={toggleLogoutMenu}
          >
            {user.name}님
          </li>
          <SlideMenu
            show={showLogoutMenu}
            items={[
              {
                label: "로그아웃",
                onClick: handleLogout,
              },
            ]}
            className="right-4 w-20 text-center"
          />
        </ul>
      ) : (
        <Link
          href="/login"
          className="text-mainColor font-bold hover:underline"
        >
          로그인
        </Link>
      )}

      <AddressBookModal
        isOpen={showAddressBookModal}
        onClose={openAddressBookModal}
      />
    </nav>
  );
}
