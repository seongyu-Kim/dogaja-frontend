import React from 'react';
import { StartArriveInfo } from '@/app/type/scheduleDetailType';
import { formatDate } from '@/app/components/common/formatDate';

interface TravelSegmentProps {
  title: string;
  info: StartArriveInfo;
}

const TravelSegment: React.FC<TravelSegmentProps> = ({ title, info }) => {
  return (
    <div className="border-2 border-mainColor rounded-lg w-full">
      <h2 className="px-4 py-2 border-dashed border-b-2 border-mainColor text-lg bg-mainColor bg-opacity-25">{title}</h2>
      <span className="border-b py-2 flex items-center gap-4">
        <p className="border-r border-gray-400 px-4 min-w-24">날짜/시간</p>
        {formatDate(info.date)}
      </span>
      <span className="border-b py-2 flex items-center gap-4">
        <p className="border-r border-gray-400 px-4 min-w-24">출발지</p>
        {info.start}
      </span>
      <span className="border-b py-2 flex items-center gap-4">
        <p className="border-r border-gray-400 px-4 min-w-24">도착지</p>
        {info.arrive}
      </span>
      <span className="border-b py-2 flex items-center gap-4">
        <p className="border-r border-gray-400 px-4 min-w-24">교통수단</p>
        {info.vehicle}
      </span>
      <span className="border-b py-2 flex items-center gap-4">
        <p className="border-r border-gray-400 px-4 min-w-24">기타 사항</p>
        {info.etc}
      </span>

    </div>
  );
};

export default TravelSegment;
