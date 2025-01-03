"use client";
import React from "react";
import UserSettings from "@/app/components/domain/my-page/UserSettings";
import MyPosts from "@/app/components/domain/my-page/MyPosts";
import Favorites from "@/app/components/domain/my-page/Favorites";

const MyPage = () => {
  return (
    <div className="flex justify-center mt-2">
      <div className="flex w-full max-w-7xl p-4">
        <UserSettings />
        <div className="flex flex-col basis-2/3 space-y-4">
          <MyPosts />
          <Favorites />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
