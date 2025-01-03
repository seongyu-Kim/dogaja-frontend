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
import Pagination from "@/app/components/common/Pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const itemsPerPage = 10;

export default function ReportPage() {
  const [list, setList] = useState<ReportListType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentItems, setCurrentItems] = useState<ReportListType[]>([]);
  const searchParams = useSearchParams();
  const boardPath = usePathname();
  const router = useRouter();
  const totalPages = list ? Math.ceil(list.length / itemsPerPage) : 0;

  useEffect(() => {
    getReportList();
  }, []);

  useEffect(() => {
    // 쿼리 파라미터에서 'page' 값을 가져와서 currentPage를 설정
    const page = parseInt(searchParams.get("page") || "1");
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  }, [searchParams]);

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const newCurrentItems = list
      ? list.slice(indexOfFirstItem, indexOfLastItem)
      : [];
    setCurrentItems(newCurrentItems);
  }, [currentPage, list]);

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
      if (e.response.data.statusCode === 401) {
        ErrorAlert("유효하지 않은 사용자");
        router.replace("/");
      }
      ErrorAlert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // 페이지 변경 시 URL 업데이트 임시 - 추후 관리자 페이지는 3제거
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      if (boardPath.split("/").length === 3) {
        router.push(`${boardPath}?page=${page}`);
        return;
      }
      router.push(
        `${boardPath.split("/").slice(0, -1).join("/")}?page=${page}`,
      );
    }
  };

  const handlePostDelete = async (id: number, postId: number) => {
    const deletePostConfirm = confirm(
      `ID:${id}번 해당 게시물을 삭제하시겠습니까?`,
    );
    if (deletePostConfirm) {
      const res = await deletePost(postId);
      await deleteReport(id);
      if (res === 200) {
        SuccessAlert("게시글 삭제 성공");
        setList((prevList) => prevList.filter((item) => item.id !== id));
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
        setList((prevList) => prevList.filter((item) => item.id !== id));
        return;
      }
      ErrorAlert("신고 삭제 실패");
    }
  };

  return (
    <div className="flex justify-center h-full">
      <div className="flex flex-col w-[50%] h-full items-center gap-20 pt-10 px-3 border-x border-mainColor">
        <p className="text-3xl">신고 게시물 목록</p>
        <main className="w-full">
          <div className="w-[300px] md:w-auto">
            <ul className="flex flex-col items-center justify-center w-full">
              {currentItems.length === 0 && <p>신고 목록이 없습니다</p>}
              {/*image_id는 임시 데이터*/}
              {currentItems.map(({ id, postID, title, type, reason, name }) => {
                const category = getBoardTitle(type);
                return (
                  <div
                    key={id}
                    className="relative flex justify-between w-full min-h-[100px] max-h-auto py-2 border-b border-gray-400 hover:cursor-pointer hover:bg-gray-200"
                  >
                    <Link href={`/board/${type}/${postID}`} className="w-full">
                      <div className="w-full flex item-center h-full px-1 gap-1">
                        <div className="w-[10%] h-full hidden md:flex items-center justify-center">
                          {/*{image_id ? (*/}
                          {/*<p>이미지</p> //임시 - 추후 이미지 가공해서 보여주기 */}
                          {/*} ) : ( */}
                          <IoDocumentText className="w-[35px] h-[35px] text-gray-400" />
                          {/*)}*/}
                        </div>
                        <div className="flex w-[59%]">
                          <div>
                            <p>ID : {id}</p>
                            <p>신고자 : {name}</p>
                            <p className="break-all">게시판 : {category}</p>
                            <p className="break-all">게시물 명 : {title}</p>
                            <p className="break-all">신고 사유 : {reason}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div className="flex absolute right-0 gap-2">
                      <Button
                        onClick={() => handlePostDelete(id, postID)}
                        style={{
                          backgroundColor: "bg-mainRed",
                          hoverColor: "hover:bg-mainRedHover",
                        }}
                        className="z-40"
                      >
                        게시글 삭제
                      </Button>
                      <Button
                        onClick={() => handleReportDelete(id)}
                        style={{
                          backgroundColor: "bg-mainRed",
                          hoverColor: "hover:bg-mainRedHover",
                        }}
                      >
                        신고 목록에서 삭제
                      </Button>
                    </div>
                  </div>
                );
              })}
            </ul>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </main>
      </div>
    </div>
  );
}
