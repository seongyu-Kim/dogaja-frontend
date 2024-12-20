"use client";
import List from "@/app/components/common/List";
import PathToCreate from "@/app/components/domain/board/PathToCreate";
import { useEffect, useState } from "react";
import Pagination from "@/app/components/common/Pagination";
import { useSearchParams } from "next/navigation";

interface BoardPorps {
  name: string;
  // 임시 타입
  list: any[];
}

export default function Board({ name, list }: BoardPorps) {
  const searchParams = useSearchParams();
  const itemsPerPage = 10;

  const totalPages = Math.ceil(list.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState<number>(1);
  //임시 타입 추후 배열에 맞게 변경
  const [currentItems, setCurrentItems] = useState<any[]>([]);

  // 페이지 상태와 currentItems 상태를 관리
  useEffect(() => {
    // 쿼리 파라미터에서 'page' 값을 가져와서 currentPage를 설정
    const page = parseInt(searchParams.get("page") || "1");
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  }, [searchParams]);

  // currentPage가 변경될 때마다 currentItems 업데이트
  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const newCurrentItems = list.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentItems(newCurrentItems);
  }, [currentPage, list]);

  // 페이지 변경 시 URL 업데이트
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      const updatedUrl = new URL(window.location.href);
      updatedUrl.searchParams.set("page", page.toString());
      window.history.pushState(null, "", updatedUrl.toString());
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col w-[50%] h-full items-center gap-20 pt-10 px-3 bg-gray-100">
      <p className="text-3xl">{name} 게시판</p>
      <main className="w-full">
        <List list={currentItems} />
        <div className="mt-2 flex justify-end">
          <PathToCreate />
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </main>
    </div>
  );
}
