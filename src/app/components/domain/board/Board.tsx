"use client";

import List from "@/app/components/common/List";
import PathToCreate from "@/app/components/domain/board/PathToCreate";
import { useEffect, useState } from "react";
import Pagination from "@/app/components/common/Pagination";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { BoardPropTypes } from "@/app/type/commonBoardPropType";
import { BoardListType } from "@/app/type/boardListType";
import { useUserStore } from "@/app/store/userStore";

const itemsPerPage = 10;

export default function Board({
  name,
  list,
  detailList,
  postId,
}: BoardPropTypes) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentItems, setCurrentItems] = useState<BoardListType[]>([]);
  const { user } = useUserStore();
  const searchParams = useSearchParams();
  const boardPath = usePathname();
  const router = useRouter();
  const totalPages = list ? Math.ceil(list.length / itemsPerPage) : 0;

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

  // 페이지 변경 시 URL 업데이트
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

  return (
    <div className="flex flex-col w-[50%] h-full items-center gap-20 pt-10 px-3 bg-gray-100">
      <p className="text-3xl">{name} 게시판</p>
      <main className="w-full">
        {currentItems.length > 0 ? (
          <List list={currentItems} detailList={detailList} postId={postId} />
        ) : (
          <p className="text-center">게시글이 없습니다</p>
        )}
        {user && (
          <div className="mt-2 flex justify-end">
            <PathToCreate />
          </div>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </main>
    </div>
  );
}
