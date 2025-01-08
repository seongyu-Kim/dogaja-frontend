"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { TravelPlan } from '@/app/type/scheduleDetailType';
import TravelDetails from '@/app/components/common/fetchSchedule/TravelDetails';
import { fetchSchedule } from "./fetchSchedule";
import { TravelLocation } from '@/app/type/scheduleDetailType';
import List from '../../../components/domain/schedule/UpdateCheck';
import Link from "next/link";

const TravelPlanPage: React.FC = () => {
  const { scheduleId } = useParams();
  const [travelPlan, setTravelPlan] = useState<TravelPlan>();
  const [locations, setLocations] = useState<TravelLocation[]>([]);

  useEffect(() => {
    const loadSchedule = async () => {
      if (!scheduleId) return;
      try {
        const data = await fetchSchedule(scheduleId as string);
        setTravelPlan(data);
        setLocations(data.locations || []);
      } catch (error) {
        console.error("Error fetching travel plan:", error);
      }
    };

    loadSchedule();
  }, [scheduleId]);

  if (!travelPlan) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-12 space-y-2 flex flex-col justify-center items-center mx-auto w-full max-w-[1100px]">
      <div className="flex flex-col justify-between items-start w-full gap-2">
        <div className="flex justify-center text-xl gap-4 p-4 mb-4 w-full min-w-[800px] border-2 border-mainColor rounded-lg bg-mainColor bg-opacity-25">
          <h1 className="border-r border-mainColor pr-4">여행 제목 : {travelPlan.title}</h1>
          <p className="border-r border-mainColor pr-4">여행 기간 : {travelPlan.period}</p>
          <p>
            동행자 : 
            {travelPlan.friendList.length > 0 ? (
              travelPlan.friendList.map((friend) => (
                <span key={friend.id} className="ml-2">{friend.name}</span>
              ))
            ) : (
              <span> 없음</span>
            )}
          </p>
        </div>
        <div className="gap-4 flex justify-center w-full min-w-[950px]">
          <div className="w-[70%] my-4">
            <TravelDetails travelPlan={travelPlan} />
            <div className="gap-4 flex w-full mt-4">
              <List 
                scheduleId={scheduleId as string} 
                items={travelPlan.checkList} 
                type="check" 
              />
              <List 
                scheduleId={scheduleId as string} 
                items={travelPlan.bucketList} 
                type="bucket" />
            </div>
          </div>

          <div className="w-[30%] my-4">
            <div className="w-full mb-4 border-2 border-mainColor rounded-lg">
              <h2 className="text-lg mb-2 py-2 px-4 border-b-2 border-mainColor border-dashed bg-mainColor bg-opacity-25">
                추억 남기기
              </h2>
              <div className="flex">
                {travelPlan.image && (
                  <div className="border border-mainColor rounded-lg m-2 p-2 bg-gray-100">
                    <img
                      src={`http://kdt-react-node-1-team02.elicecoding.com${travelPlan.image}`}
                      alt="후기 사진"
                      className="w-32 h-auto rounded-lg shadow-lg bg-white"
                    />
                  </div>
                )}
                <p className="text-gray-600 p-2">
                  {travelPlan.review || "아직 후기가 없어요! 추억을 위해 후기를 작성해주세요 :)"}
                </p>
              </div>
            </div>
            <div className="border-2 border-mainColor rounded-lg w-full min-h-[395px] max-h-[395px]">
              <h2 className="text-lg py-2 px-4 border-b-2 border-mainColor border-dashed bg-mainColor bg-opacity-25">
                일정에 추가 된 장소
              </h2>
              <div className="overflow-y-auto max-h-[335px] m-2 py-2">
                {locations.length > 0 ? (
                  locations.map((location) => (
                    <div
                      key={location.id}
                      className="border border-mainColor rounded-lg flex items-center p-2 mb-2"
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold pb-1">{location.location}</span>
                        <span className="text-xs pb-1">전화번호: {location.phone || "없음"}</span>
                        <span className="text-xs">주소: {location.address || "정보 없음"}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 mt-4">
                    아직 추가된 장소가 없습니다!<br />
                    <div className="mt-8">
                      이번 여행에 가보고 싶은 장소를 
                      <span className="font-semibold text-mainColor px-2">
                      <Link
                        href="/dashboard"
                        className="font-semibold text-mainColor"
                      >
                        [장소 정보 보기]
                      </Link>
                      </span>
                      에서 추가해보세요!
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Link
        href="/my-schedule"
        className="bg-mainColor hover:bg-mainHover text-white py-2 px-4 rounded" // Tailwind CSS 클래스를 사용하여 스타일 적용
      >
        목록으로
      </Link>
    </div>
  );
};

export default TravelPlanPage;
