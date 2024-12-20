'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Logo from "@/app/assets/Do_logo_non_text.png";
import Image from 'next/image';
import { FaRegAddressBook } from "react-icons/fa6";
import { PiBellBold } from "react-icons/pi";
import SlideMenu from './Slidemenu';

export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);

  const notifications = ['🖐친구요청이 도착했습니다.', '알림 2', '알림 3'];
  const logoutItems = ['로그아웃'];

  const toggleNotifications = () => setShowNotifications(prev => !prev);
  const toggleLogoutMenu = () => setShowLogoutMenu(prev => !prev);

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
        <li className="cursor-pointer">
          <FaRegAddressBook className="text-mainColor text-2xl hover:scale-105 transition-all duration-300 ease-in-out" />
        </li>
        <li className="relative">
          <button
            className="cursor-pointer text-mainColor text-2xl focus:outline-none"
            onClick={toggleNotifications}
          >
            <PiBellBold className="hover:scale-105 transition-all duration-300 ease-in-out"/>
          </button>
          <SlideMenu 
            show={showNotifications} 
            items={notifications}
            className="right-0 w-60 mt-4"
          />
        </li>

        <li 
          className="mr-2 hover:underline cursor-pointer text-mainColor font-bold hover:scale-105 transition-all duration-300 ease-in-out"
          onClick={toggleLogoutMenu}
        >
          박주호님
        </li>
        <SlideMenu 
          show={showLogoutMenu} 
          items={logoutItems}
          className="right-4 w-20 text-center"
        />
      </ul>
    </nav>
  );
}
