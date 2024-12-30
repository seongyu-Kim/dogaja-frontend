"use client";
import PostCreate from "@/app/components/domain/board/PostCreate";
import { useUserStore } from "@/app/store/userStore";
import { useRouter } from "next/navigation";

export default function FindFriendPostCreatePage() {
  const { user } = useUserStore();
  const router = useRouter();
  if (!user) {
    router.push("./");
    return null;
  }
  return <PostCreate />;
}
