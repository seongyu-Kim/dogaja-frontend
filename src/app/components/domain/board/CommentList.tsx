"use client";

import { CommentType } from "@/app/type/boardListType";
import CommentItem from "@/app/components/domain/board/CommentItem";
import { useState } from "react";
import { useParams } from "next/navigation";

interface ListProps {
  // 임시 타입
  list: CommentType[];
}
// 추가로 라우터 주소, 받아야함
export default function CommentList({ list }: ListProps) {
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const { boardId } = useParams();

  const handleEditClick = (id: number) => {
    setEditingCommentId(id);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null); // 수정 취소 시 상태 초기화
  };

  if (list.length === 0) {
    return <p className="text-center">댓글이 없습니다.</p>;
  }

  return (
    <main className="w-[300px] md:w-auto">
      <ul className="flex flex-col items-center justify-center w-full">
        {list.map((item) => {
          const { id, content, user } = item;
          return (
            <CommentItem
              key={id}
              id={id}
              postId={boardId as string}
              content={content}
              user={user}
              editing={editingCommentId === id}
              onEditClick={handleEditClick}
              onCancelEdit={handleCancelEdit}
            />
          );
        })}
      </ul>
    </main>
  );
}
