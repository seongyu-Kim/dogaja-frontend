"use client";

import Link from "next/link";
import { IoDocumentText } from "react-icons/io5";
import Button from "@/app/components/common/Button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Pagination from "@/app/components/common/Pagination";

const testList = [
  // 임시 테스트 리스트
  {
    id: 1,
    location: "경복궁",
    startDate: "2024-12-23T09:00:00.000Z",
    endDate: "2024-12-23T10:00:00.000Z",
    members: ["여기저기", "닉네임", "이름 생각하기 싫다", "여기에요"],
    comment: "좋아요",
    image_id: null,
  },
  {
    id: 2,
    location: "잠실",
    startDate: "2024-12-23T09:00:00.000Z",
    endDate: "2024-12-23T10:00:00.000Z",
    members: ["여기저기", "닉네임", "이름 생각하기 싫다", "여기에요"],
    comment: "좋아요~",
    image_id: "aa",
  },
  {
    id: 3,
    location: "강남",
    startDate: "2024-12-23T09:00:00.000Z",
    endDate: "2024-12-23T10:00:00.000Z",
    members: ["여기저기", "닉네임", "이름 생각하기 싫다", "여기에요"],
    comment: "좋아요~~",
    image_id: null,
  },
  {
    id: 4,
    location: "나주곰탕",
    startDate: "2024-12-23T09:00:00.000Z",
    endDate: "2024-12-23T10:00:00.000Z",
    members: ["여기저기", "닉네임", "이름 생각하기 싫다", "여기에요"],
    comment: "좋아요~~~",
    image_id: "aa",
  },
  {
    id: 5,
    location: "킹데리아",
    startDate: "2024-12-23T09:00:00.000Z",
    endDate: "2024-12-23T10:00:00.000Z",
    members: ["스폰지밥", "뚱이", "집게사장", "다람이"],
    comment: "좋아요~~~~",
    image_id: null,
  },
  {
    id: 6,
    location: "의정부",
    startDate: "2024-12-23T09:00:00.000Z",
    endDate: "2024-12-23T10:00:00.000Z",
    members: ["여기저기", "닉네임", "이름 생각하기 싫다", "여기에요"],
    comment: "좋아요~~~~~",
    image_id: "aa",
  },
];

export default function MySchedulePage() {
  const searchParams = useSearchParams();
  const boardPath = usePathname();
  const router = useRouter();
  const itemsPerPage = 5;

  const totalPages = Math.ceil(testList!.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState<number>(1);
  //임시 타입 추후 배열에 맞게 변경
  const [currentItems, setCurrentItems] = useState<any[]>([]);

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
    const newCurrentItems = testList!.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentItems(newCurrentItems);
  }, [currentPage, testList]);

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
    <div className="flex justify-center">
      <div className="flex flex-col w-[80%] h-full gap-20 pt-10 px-3 bg-gray-100">
        <div className="flex items-center justify-between">
          <p className="text-3xl">일정 관리</p>
          {/*임시 추후 일정 생성 create 페이지로 이동*/}
          <Link href="/my-schedule/planner">
            <Button
              style={{
                backgroundColor: "bg-mainColor",
                hoverColor: "hover:bg-mainHover",
                width: "w-[100px]",
              }}
            >
              일정 생성
            </Button>
          </Link>
        </div>
        <main className="w-full">
          <div className="w-[300px] md:w-auto">
            <Description list={currentItems} />
          </div>
        </main>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
//임시 추후 타입 지정
function Description({ list }: any) {
  return (
    <ul className="flex flex-col items-center justify-center w-full">
      {/*임시 추후 타입 지정*/}
      {list!.map((item: any) => {
        const route = usePathname();
        const formattedStartDate = new Date(item.startDate).toLocaleString(
          "ko-KR",
          {
            dateStyle: "medium",
            timeStyle: "short",
          },
        );
        const formattedEndDate = new Date(item.endDate).toLocaleString(
          "ko-KR",
          {
            dateStyle: "medium",
            timeStyle: "short",
          },
        );
        const nights = Math.ceil(
          (new Date(item.endDate).getTime() -
            new Date(item.startDate).getTime()) /
            (1000 * 60 * 60 * 24),
        );
        const days = nights + 1;
        const members = item.members?.join(", ") || "동행자 없음";
        //링크 주소 추후 조회 수정 페이지 경로로 던져주기
        return (
          //   임시 추후 일정 상세 보기 페이지로 이동
          <Link
            href={`${route}/${item.id}`}
            key={item.id}
            className="w-full h-[150px] py-2 border-b border-gray-400 hover:cursor-pointer hover:bg-gray-200"
          >
            <div className="w-full flex item-center h-full px-1 gap-1">
              <div className="w-[10%] h-full hidden md:flex items-center justify-center bg-gray-200 rounded-lg">
                {item.image_id ? (
                  <p>이미지</p> //임시 - 추후 이미지 가공해서 보여주기
                ) : (
                  <IoDocumentText className="w-[55px] h-[55px] text-gray-400" />
                )}
              </div>
              <div className="flex w-[59%]">
                <div>
                  <p>장소 : {item.location}</p>
                  <div className="flex gap-5">
                    <p className="break-all">
                      기간 : {formattedStartDate} ~ {formattedEndDate}
                    </p>
                    <p className="text-gray-500">
                      {nights}박 {days}일
                    </p>
                  </div>
                  <p>동행자 : {members}</p>
                  <p>한줄 후기 : {item.comment}</p>
                </div>
              </div>
              <div className="flex gap-2 ml-auto">
                {/*임시 추후 일정 관리 수정 페이지로 이동 id 값 가지고*/}
                <Link href={"./"}>
                  <Button
                    style={{
                      backgroundColor: "bg-mainBlue",
                      hoverColor: "hover:bg-mainBlueHover",
                      width: "w-[100px]",
                    }}
                  >
                    수정
                  </Button>
                </Link>
                <Button
                  style={{
                    backgroundColor: "bg-mainRed",
                    hoverColor: "hover:bg-mainRedHover",
                    width: "w-[100px]",
                  }}
                >
                  삭제
                </Button>
              </div>
            </div>
          </Link>
        );
      })}
    </ul>
  );
}
