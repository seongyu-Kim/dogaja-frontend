"use client";

import PostUpdate from "@/app/components/domain/board/PostUpdate";
import { useUserStore } from "@/app/store/userStore";
import { useRouter } from "next/navigation";

export default function FindFriendPostUpdatePage() {
  const { user } = useUserStore();
  const router = useRouter();
  if (!user) {
    router.push("./");
    return null;
  }
  return <PostUpdate />;
}
