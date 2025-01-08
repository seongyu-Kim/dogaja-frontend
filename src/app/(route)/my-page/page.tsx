"use client";
import React from "react";
import UserSettings from "@/app/components/domain/my-page/UserSettings";
import MyPosts from "@/app/components/domain/my-page/MyPosts";
import Favorites from "@/app/components/domain/my-page/Favorites";

const MyPage = () => {
  return (
    <div className="flex justify-center mt-2">
      <div className="flex w-full max-w-7xl p-4 gap-4">
        <div className="w-2/3">
          <MyPosts />
        </div>
        <div className="flex flex-col gap-4 w-1/3">
          <UserSettings />
          <Favorites />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
