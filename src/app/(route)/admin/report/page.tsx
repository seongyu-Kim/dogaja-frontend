"use client";

import Link from "next/link";
import { IoDocumentText } from "react-icons/io5";
import Button from "@/app/components/common/Button";
import { API } from "@/app/utils/api";
import { ErrorAlert, SuccessAlert } from "@/app/utils/toastAlert";
import { mainApi } from "@/app/utils/mainApi";
import { useEffect, useState } from "react";
import { ReportListType } from "@/app/type/boardListType";
import { deletePost, deleteReport } from "@/app/utils/boardApi";
import getBoardTitle from "@/app/utils/getBoardTitle";

export default function ReportPage() {
  const [list, setList] = useState<ReportListType[]>([]);

  useEffect(() => {
    getReportList();
  }, []);

  //신고 게시판 목록 불러오기
  const getReportList = async () => {
    const { REPORT_GET } = API.REPORT;
    try {
      const res = await mainApi({
        url: REPORT_GET,
        method: "GET",
        withAuth: true,
      });
      if (res.status === 200) {
        setList(res.data as ReportListType[]);
        return;
      }
    } catch (e) {
      console.error(e);
      ErrorAlert("리스트 조회 실패");
    }
  };

  const handlePostDelete = async (id: number, postId: number) => {
    const deletePostConfirm = confirm(
      `ID:${id}번 해당 게시물을 삭제하시겠습니까?`,
    );
    if (deletePostConfirm) {
      const res = await deletePost(postId);
      if (res === 200) {
        SuccessAlert("게시글 삭제 성공");
        return;
      }
      ErrorAlert("게시글 삭제 실패");
    }
  };

  const handleReportDelete = async (id: number) => {
    const deleteReportConfirm = confirm(
      `ID:${id}번 해당 신고를 삭제하시겠습니까?`,
    );
    if (deleteReportConfirm) {
      const res = await deleteReport(id);
      if (res === 200) {
        SuccessAlert("신고 삭제 성공");
        return;
      }
      ErrorAlert("신고 삭제 실패");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-[50%] h-full items-center gap-20 pt-10 px-3 bg-gray-100">
        <p className="text-3xl">신고 게시물 목록</p>
        <main className="w-full">
          <div className="w-[300px] md:w-auto">
            <ul className="flex flex-col items-center justify-center w-full">
              {list.length === 0 && <p>신고 목록이 없습니다</p>}
              {/*image_id는 임시 데이터*/}
              {list.map(({ id, postID, title, type, reason, name }) => {
                const category = getBoardTitle(type);
                return (
                  <div
                    key={id}
                    className="relative flex justify-between w-full min-h-[100px] max-h-auto py-2 border-b border-gray-400 hover:cursor-pointer hover:bg-gray-200"
                  >
                    <Link href={`/board/${type}/${postID}`} className="w-full">
                      <div className="w-full flex item-center h-full px-1 gap-1">
                        <div className="w-[10%] h-full hidden md:flex items-center justify-center bg-gray-200 rounded-lg">
                          {/*{image_id ? (*/}
                          {/*<p>이미지</p> //임시 - 추후 이미지 가공해서 보여주기 */}
                          {/*} ) : ( */}
                          <IoDocumentText className="w-[55px] h-[55px] text-gray-400" />
                          {/*)}*/}
                        </div>
                        <div className="flex w-[59%]">
                          <div>
                            <p>
                              ID : {id} 신고자 : {name}
                            </p>
                            <p className="break-all">게시판 : {category}</p>
                            <p className="break-all">게시물 명 : {title}</p>
                            <p className="break-all">신고 사유 : {reason}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div className="flex absolute right-0 gap-2">
                      <Button onClick={() => handlePostDelete(id, postID)}>
                        게시글 삭제
                      </Button>
                      <Button onClick={() => handleReportDelete(id)}>
                        신고 목록에서 삭제
                      </Button>
                    </div>
                  </div>
                );
              })}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}
