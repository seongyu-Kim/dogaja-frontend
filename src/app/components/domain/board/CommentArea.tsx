"use client";

import { CommentType } from "@/app/type/boardListType";
import { FaComment } from "react-icons/fa";
import CommentList from "@/app/components/domain/board/CommentList";
import CommentCreate from "@/app/components/domain/board/CommentCreate";
import { useUserStore } from "@/app/store/userStore";

export default function CommentArea({
  list,
  postId,
}: {
  list: CommentType[];
  postId: string;
}) {
  const { user } = useUserStore();
  const defaultCommentList = list.filter(
    (item) => item.id !== null && item.id !== undefined && item.user.name,
  );
  return (
    <>
      <div className="flex flex-col gap-3 border-b border-gray-400 pb-6">
        <div className="flex gap-3 items-center">
          <FaComment className="w-[25px] h-[25px] text-gray-400" />
          <p>{defaultCommentList.length} 댓글</p>
        </div>
        <div>
          <CommentList list={defaultCommentList} />
        </div>
      </div>
      {user && <CommentCreate id={postId} />}
    </>
  );
}
