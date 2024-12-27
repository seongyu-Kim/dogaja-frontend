"use client";

import Link from "next/link";
import Button from "@/app/components/common/Button";
import { ErrorAlert, SuccessAlert } from "@/app/utils/toastAlert";

import { deletePost } from "@/app/utils/boardApi";
import React, { useState } from "react";
import DeclarationModal from "@/app/components/DeclarationModal";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/app/store/userStore";

export default function BoardDetailViewButtonBox({
  postId,
  name,
}: {
  postId: string;
  name: string;
}) {
  const [reportModal, setReportModal] = useState(false);
  const { user } = useUserStore();
  const router = useRouter();

  const handleOpenModal = () => setReportModal((prev) => !prev);
  const handleCloseModal = () => setReportModal(false);
  const handleDeleteClick = async () => {
    const deleteCheck = confirm("게시글을 삭제하시겠습니까?");
    if (deleteCheck) {
      const res = await deletePost(Number(postId));
      if (res === 200) {
        SuccessAlert("게시글이 삭제되었습니다");
        router.push("./");
        return;
      }
      if (res !== 200) {
        ErrorAlert("게시글 삭제 실패");
      }
    }
  };
  return (
    <div className="flex items-center justify-between">
      <p onClick={handleOpenModal}>신고</p>
      <div className="flex gap-2">
        {user && (
          <Link href="./create">
            <Button
              style={{
                backgroundColor: "bg-mainColor",
                hoverColor: "hover:bg-mainHover",
                width: "w-[90px]",
              }}
            >
              글 작성
            </Button>
          </Link>
        )}
        {user && (user.admin || user.name === name) && (
          <>
            <Link href={`./${postId}/update`}>
              <Button
                style={{
                  backgroundColor: "bg-mainColor",
                  hoverColor: "hover:bg-mainHover",
                  width: "w-[90px]",
                }}
              >
                수정
              </Button>
            </Link>
            <Button
              onClick={handleDeleteClick}
              style={{
                backgroundColor: "bg-mainColor",
                hoverColor: "hover:bg-mainHover",
                width: "w-[90px]",
              }}
            >
              삭제
            </Button>
          </>
        )}
      </div>
      <DeclarationModal
        isOpen={reportModal}
        onClose={handleCloseModal}
        reportId={postId}
      />
    </div>
  );
}
