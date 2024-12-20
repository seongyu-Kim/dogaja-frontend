"use client";

import { useState } from "react";
import Board from "@/app/components/domain/board/Board";
import PaginationExample from "@/app/components/common/Pagination";

const testList = [
  // 임시 테스트 리스트
  {
    id: 1,
    title: "1번",
    name: "여기저기",
    image_id: null,
    //임시
    commentCount: 6,
  },
  {
    id: 2,
    title: "3번",
    name: "이거저거",
    image_id: "aa",
    //임시
    commentCount: 125,
  },
  {
    id: 3,
    title: "1번",
    name: "여기저기",
    image_id: null,
    //임시
    commentCount: 6,
  },
  {
    id: 4,
    title: "3번",
    name: "이거저거",
    image_id: "aa",
    //임시
    commentCount: 125,
  },
  {
    id: 5,
    title: "1번",
    name: "여기저기",
    image_id: null,
    //임시
    commentCount: 6,
  },
  {
    id: 6,
    title: "3번",
    name: "이거저거",
    image_id: "aa",
    //임시
    commentCount: 125,
  },
];

export default function ReviewBoardPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(testList.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = testList.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Board name="후기" list={currentItems} />
      <div className="mt-4">
        <PaginationExample
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
