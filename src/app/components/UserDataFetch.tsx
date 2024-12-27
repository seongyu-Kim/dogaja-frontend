"use client";
import { useUserStore } from "@/app/store/userStore";
import { useEffect } from "react";

export default function UserDataFetch() {
  const { fetchUser } = useUserStore();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser();
    }
  }, []);
  return null;
}
