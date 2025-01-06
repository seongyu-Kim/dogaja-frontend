"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { TravelPlan } from '@/app/type/scheduleDetailType';
import TravelDetails from '@/app/components/common/fetchSchedule/TravelDetails';
import { fetchSchedule } from "./fetchSchedule";
import List from './[listId]/page';

const TravelPlanPage: React.FC = () => {
  const { scheduleId } = useParams();
  const [travelPlan, setTravelPlan] = useState<TravelPlan>();

  useEffect(() => {
    const loadSchedule = async () => {
      if (!scheduleId) return;
      try {
        const data = await fetchSchedule(scheduleId as string);
        setTravelPlan(data);
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
    <div className="flex flex-col justify-center items-center mt-8 w-full">
      <div className="flex justify-center text-xl gap-4 p-4 mb-8 w-2/3 border-2 border-mainColor rounded-lg bg-mainColor bg-opacity-25">
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
      <TravelDetails travelPlan={travelPlan} />
      <div className="gap-4 flex w-2/3 my-4">
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

        {travelPlan.image && (
          <div className="w-2/3 mb-8">
            <h2 className="text-lg mb-2">여행 사진</h2>
            <img
              src={travelPlan.image}
              alt="Travel"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        )}
        <div className="w-2/3 mb-8 border-2 border-mainColor rounded-lg">
          <h2 className="text-lg mb-2 py-2 px-4 border-b-2 border-mainColor border-dashed bg-mainColor bg-opacity-25">
            한 줄 후기
          </h2>
          <p className="text-gray-600 p-2">
            {travelPlan.review || "아직 후기가 없어요! 추억을 위해 후기를 작성해주세요 :)"}
          </p>
        </div>

    </div>
  );
};

export default TravelPlanPage;
