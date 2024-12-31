"use client";

import Link from "next/link";
import { IoDocumentText } from "react-icons/io5";
import Button from "@/app/components/common/Button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Pagination from "@/app/components/common/Pagination";
import { scheduleGet } from "@/app/utils/boardApi";
import { ScheduleType } from "@/app/type/scheduleListType";
import { useUserStore } from "@/app/store/userStore";
import days from "@/app/utils/days";
import { ErrorAlert, SuccessAlert } from "@/app/utils/toastAlert";

const itemsPerPage = 5;

export default function MySchedulePage() {
  const [list, setList] = useState<ScheduleType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentItems, setCurrentItems] = useState<ScheduleType[]>([]);
  const searchParams = useSearchParams();
  const boardPath = usePathname();
  const router = useRouter();
  const totalPages = Math.ceil(list!.length / itemsPerPage);

  useEffect(() => {
    const getList = async () => {
      const scheduleList = await scheduleGet();
      if (!scheduleList) {
        setList([]);
        return;
      }
      setList(scheduleList);
    };
    getList();
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
    const newCurrentItems = list!.slice(indexOfFirstItem, indexOfLastItem);
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

  const handleDeleteClick = async (id: number) => {
    const deleteConfirm = confirm("일정을 삭제 하시겠습니까?");
    if (deleteConfirm) {
      const res = 200; // api 요청 부분
      if (res === 200) {
        SuccessAlert("일정이 삭제되었습니다");
        return;
      }
      ErrorAlert("일정 삭제 오류");
    }
  };

  return (
    <div className="flex justify-center h-full">
      <div className="flex flex-col w-[80%] h-full gap-20 pt-10 px-3 border-x border-mainColor">
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
            {currentItems.length === 0 && (
              <p className="text-center">일정이 없습니다</p>
            )}
            <Description list={currentItems} onDelete={handleDeleteClick} />
          </div>
        </main>
        {currentItems.length !== 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}
//임시 추후 타입 지정
function Description({
  list,
  onDelete,
}: {
  list: ScheduleType[];
  onDelete: (id: number) => void;
}) {
  const { user: loginUser } = useUserStore();
  return (
    <ul className="flex flex-col items-center justify-center w-full gap-4">
      {list!.map(
        ({ id, title, user, location, period, review, image, friends }) => {
          const route = usePathname();
          const [start, end, day] = days(period);
          return (
            //   임시 추후 일정 상세 보기 페이지로 이동
            <div
              key={id}
              className="w-full h-[150px] border-b border-gray-400 hover:cursor-pointer hover:bg-gray-200"
            >
              <div className="w-full flex item-center h-full px-2 gap-1 relative">
                <Link
                  href={`${route}/${id}`}
                  className="w-full flex item-center h-full px-2 gap-1"
                >
                  <div className="w-[10%] h-full hidden md:flex items-center justify-center">
                    {image ? (
                      <p>이미지</p> //임시 - 추후 이미지 가공해서 보여주기
                    ) : (
                      <IoDocumentText className="w-[55px] h-[55px] text-gray-400" />
                    )}
                  </div>
                  <div className="flex w-[59%]">
                    <div>
                      <p>작성자 : {user.name}</p>
                      <p>{title}</p>
                      <p>장소 : {location}</p>
                      <div className="flex gap-5">
                        <p className="break-all">
                          기간 : {start} ~ {end}
                        </p>
                        <p className="text-gray-500">{day}일</p>
                      </div>
                      {friends && friends.length > 0 ? (
                        <p>
                          동행자: {friends.map(({ name }) => name).join(", ")}
                        </p>
                      ) : (
                        <p>동행자가 없습니다.</p>
                      )}
                      <p>{review ? `${review}` : "후기가 없습니다"}</p>
                    </div>
                  </div>
                </Link>
                {loginUser && loginUser.name === user.name && (
                  <div className="flex gap-2 ml-auto absolute right-0">
                    {/*임시 추후 일정 관리 수정 페이지로 이동 id 값 가지고*/}
                    <Button
                      onClick={() => onDelete(id)}
                      style={{
                        backgroundColor: "bg-mainRed",
                        hoverColor: "hover:bg-mainRedHover",
                        width: "w-[100px]",
                      }}
                    >
                      삭제
                    </Button>
                    {/*임시 - 추후 아래 주소 수정*/}
                    <Link href={`${route}/${id}/update`}>
                      <Button
                        style={{
                          backgroundColor: "bg-mainColor",
                          hoverColor: "hover:bg-mainHover",
                          width: "w-[100px]",
                        }}
                      >
                        수정
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          );
        },
      )}
    </ul>
  );
}
