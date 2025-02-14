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
import { PiBellBold, PiBellRingingFill } from "react-icons/pi";
import SlideMenu from "./Slidemenu";
import AddressBookModal from "../AddressBookModal";
import NotificationList from "../NotificationList";
import { NotificationType } from "@/app/type/natificationType";
import { useUserStore } from "@/app/store/userStore";

export default function Navbar() {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  const [showAddressBookModal, setShowAddressBookModal] = useState(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const { resetUser, user } = useUserStore();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    getFriendRequests();
  }, [user]);

  const getFriendRequests = async () => {
    if (!user) return;

    const { FRIENDS_REQUEST_GET } = API.FRIENDS;

    try {
      const res = await mainApi<{ requests: NotificationType[] }>({
        url: FRIENDS_REQUEST_GET,
        method: "GET",
        withAuth: true,
      });

      if (res.status === 200) {
        setNotifications(res.data.requests || []);
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
              {unreadCount > 0 ? (
                <PiBellRingingFill className="hover:scale-105 transition-all duration-300 ease-in-out" />
              ) : (
                <PiBellBold className="hover:scale-105 transition-all duration-300 ease-in-out" />
              )}
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-1 text-xs">
                  {unreadCount}
                </span>
              )}
            </button>
            {showNotifications && (
              <div className="absolute right-0 w-60 mt-4">
                <NotificationList onUnreadCountChange={setUnreadCount} />
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
          <AddressBookModal
            isOpen={showAddressBookModal}
            onClose={openAddressBookModal}
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
    </nav>
  );
}
