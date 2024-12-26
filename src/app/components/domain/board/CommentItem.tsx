import React, { useState } from "react";
import CommentUpdate from "@/app/components/domain/board/CommentUpdate";
import { ErrorAlert, SuccessAlert } from "@/app/utils/toastAlert";
import { deleteComment, updateComment } from "@/app/utils/boardApi";

interface CommentItemProps {
  id: number;
  postId: string;
  content: string;
  user: {
    id: string;
    name: string;
  };
  editing: boolean;
  onEditClick: (id: number) => void;
  onCancelEdit: () => void; // 취소 핸들러
}

export default function CommentItem({
  id,
  postId,
  content,
  user,
  editing,
  onEditClick,
  onCancelEdit,
}: CommentItemProps) {
  const [updateContent, setUpdateContent] = useState<string>(content);
  const commentId = String(id);

  const handleDeleteClick = async () => {
    const deleteCheck = confirm(`${content} 댓글을 삭제하시겠습니까?`);
    if (deleteCheck) {
      const res = await deleteComment(commentId, postId);
      if (res === 200) {
        SuccessAlert("댓글이 삭제되었습니다");
      }
      if (res !== 200) {
        ErrorAlert("댓글 삭제 실패");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdateContent(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!updateContent) {
      ErrorAlert("필드를 채워주세요");
      return;
    }
    const formData = new FormData(e.target as HTMLFormElement);
    const res = await updateComment(formData, commentId, postId);
    if (res === 200) {
      SuccessAlert("댓글이 수정되었습니다");
      onCancelEdit();
      return;
    }
    if (res !== 200) {
      ErrorAlert("댓글 수정 실패");
      onCancelEdit();
    }
  };

  const isOwnComment = true; // 임시 - 본인 댓글만 수정 삭제 가능하게

  return (
    <li className="w-full p-2 mb-5">
      <div className="flex items-center justify-between bg-gray-300 p-1 rounded-[4px] break-all w-full">
        <p className="text-sm">{user.name}</p>
        {isOwnComment && (
          <div>
            {!editing ? (
              <div className="flex items-center gap-2 mr-2">
                <button className="text-sm" onClick={() => onEditClick(id)}>
                  수정
                </button>
                <button className="text-sm" onClick={handleDeleteClick}>
                  삭제
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 mr-2">
                <button
                  className="text-sm"
                  type="button"
                  onClick={onCancelEdit}
                >
                  취소
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="py-1 break-all">
        {editing ? (
          <CommentUpdate
            value={updateContent}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        ) : (
          <p className="text-sm">{content}</p>
        )}
      </div>
    </li>
  );
}
