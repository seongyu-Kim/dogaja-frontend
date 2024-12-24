"use client";

import Link from "next/link";
import Button from "@/app/components/common/Button";
import { ErrorAlert, SuccessAlert } from "@/app/utils/toastAlert";
import { deletePost } from "@/app/actions";

export default function BoardDetailViewButtonBox({
  postId,
}: {
  postId: string;
}) {
  const a = true; //임시 추후 유저 데이터 값으로 버튼 필터링
  const handleDeleteClick = async () => {
    const deleteCheck = confirm("게시글을 삭제하시겠습니까?");
    if (deleteCheck) {
      const res = await deletePost(Number(postId));
      if (res === 200) {
        SuccessAlert("게시글이 삭제되었습니다");
      }
      if (res !== 200) {
        ErrorAlert("게시글 삭제 실패");
      }
    }
  };
  return (
    <div className="flex items-center justify-between">
      <p>신고</p>
      <div className="flex gap-2">
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
        {a && (
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
    </div>
  );
}
