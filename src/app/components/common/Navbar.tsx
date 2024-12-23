'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from "@/app/assets/Do_logo_non_text.png";
import { FaRegAddressBook } from "react-icons/fa6";
import { PiBellBold } from "react-icons/pi";
import SlideMenu from './Slidemenu';
import AddressBookModal from '../AddressBookModal';
import RequestModal from "../RequestModal";
import NotificationList, { Notification } from '../NotificationList'; // NotificationList 컴포넌트 import

export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  const [showAddressBookModal, setShowAddressBookModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  const notifications: Notification[] = [
    { id: 1, type: 'friend', userId: 123, name: "엘리스", code: "친구" },
    { id: 2, type: 'invite', userId: 234, name: "김토끼", code: "초대" },
  ];

  const toggleNotifications = () => setShowNotifications(prev => !prev);
  const toggleLogoutMenu = () => setShowLogoutMenu(prev => !prev);
  const toggleAddressBookModal = () => setShowAddressBookModal(prev => !prev);

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    setShowRequestModal(true);
  };

  const closeRequestModal = () => {
    setShowRequestModal(false);
    setSelectedNotification(null);
  };

  return (
    <nav className="w-full border-b-4 border-mainColor text-white p-4 flex justify-between items-center relative">
      <div>
        <Link href="/" passHref>
          <Image 
            src={Logo}
            alt="Logo" 
            width={50} 
            height={50} 
          />
        </Link>
      </div>

      <ul className="flex gap-3">
        <li className="cursor-pointer" onClick={toggleAddressBookModal}>
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
          박주호님
        </li>
        <SlideMenu
          show={showLogoutMenu}
          items={['로그아웃']}
          className="right-4 w-20 text-center"
        />
      </ul>

      <AddressBookModal 
        isOpen={showAddressBookModal} 
        onClose={toggleAddressBookModal} 
      />
      {showRequestModal && selectedNotification && (
        <RequestModal
          isOpen={showRequestModal}
          onClose={closeRequestModal}
          title={selectedNotification.type === 'friend' ? "친구 요청" : "초대 요청"}
          explanation={`${selectedNotification.name}님이 ${selectedNotification.code} 요청을 하셨습니다.`}
          userId={selectedNotification.userId}
        />
      )}
    </nav>
  );
}
