"use client";

import List from "@/app/components/common/List";
import PathToCreate from "@/app/components/domain/board/PathToCreate";
import getPath from "@/app/utils/getPath";
import Link from "next/link";
import { IoDocumentText } from "react-icons/io5";
import Button from "@/app/components/common/Button";

const testList = [
  // 임시 테스트 리스트
  {
    id: 1,
    title: "1번",
    name: "여기저기",
    image_id: null,
    //임시
    reportDescription: "돌에 눈이 달려있어요",
  },
  {
    id: 2,
    title: "3번",
    name: "이거저거",
    image_id: "aa",
    //임시
    reportDescription: 125,
  },
  {
    id: 3,
    title: "1번",
    name: "여기저기",
    image_id: null,
    //임시
    reportDescription: 6,
  },
  {
    id: 4,
    title: "3번",
    name: "이거저거",
    image_id: "aa",
    //임시
    reportDescription: 125,
  },
  {
    id: 5,
    title: "1번",
    name: "여기저기",
    image_id: null,
    //임시
    reportDescription: 6,
  },
  {
    id: 6,
    title: "3번",
    name: "이거저거",
    image_id: "aa",
    //임시
    reportDescription: 125,
  },
];

export default function ReportPage() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-[50%] h-full items-center gap-20 pt-10 px-3 bg-gray-100">
        <p className="text-3xl">신고 게시물 목록</p>
        <main className="w-full">
          <div className="w-[300px] md:w-auto">
            <ul className="flex flex-col items-center justify-center w-full">
              {testList.map((item) => {
                const route = getPath(`${item.id}`);

                return (
                  <Link
                    href={route}
                    key={item.id}
                    className="w-full h-[100px] py-2 border-b border-gray-400 hover:cursor-pointer hover:bg-gray-200"
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
                          <p>게시물 명 : {item.title}</p>
                          <p className="break-words">
                            신고 사유:{item.reportDescription}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 right-0">
                        <Button>게시글 삭제</Button>
                        <Button>신고 목록에서 삭제</Button>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}
