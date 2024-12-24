import React from "react";
import Input from './Input';
import Button from './Button';

interface TravelSegmentProps {
  title: string;
  departure: string;
  arrival: string;
  transportation: string;
  additionalInfo: string;
  setDeparture: (value: string) => void;
  setArrival: (value: string) => void;
  setTransportation: (value: string) => void;
  setAdditionalInfo: (value: string) => void;
}

const TravelSegment: React.FC<TravelSegmentProps> = ({
  title,
  departure,
  arrival,
  transportation,
  additionalInfo,
  setDeparture,
  setArrival,
  setTransportation,
  setAdditionalInfo,
}) => {
  return (
    <div className="border rounded-lg border-mainColor p-4 w-full">
      <h2 className="font-bold mb-2">{title}</h2>
      <div className="flex flex-col gap-2 border-t border-mainColor pt-2">
        <div className="flex items-center text-sm mb-1">
          <span className="pr-2 w-1/4">날짜/시간</span>
          <Input
            type="text"
            name="departure"
            placeholder="날짜 및 시간을 입력하세요"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            className="border rounded px-3 py-1 w-3/4"
          />
        </div>
        <div className="flex items-center text-sm mb-1">
          <span className="pr-2 w-1/4">출발지</span>
          <Input
            type="text"
            name="departureLocation"
            placeholder="출발지를 입력하세요"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            className="border rounded px-3 py-1 w-3/4"
          />
        </div>
        <div className="flex items-center text-sm mb-1">
          <span className="pr-2 w-1/4">도착지</span>
          <Input
            type="text"
            name="arrival"
            placeholder="도착지를 입력하세요"
            value={arrival}
            onChange={(e) => setArrival(e.target.value)}
            className="border rounded px-3 py-1 w-3/4"
          />
        </div>
        <div className="flex items-center text-sm mb-1">
          <span className="pr-2 w-1/4">교통 수단</span>
          <Input
            type="text"
            name="transportation"
            placeholder="교통 수단을 입력하세요"
            value={transportation}
            onChange={(e) => setTransportation(e.target.value)}
            className="border rounded px-3 py-1 w-3/4"
          />
        </div>
        <div className="flex items-center text-sm mb-1">
          <span className="pr-2 w-1/4">기타사항</span>
          <textarea
            className="border rounded px-3 py-1 w-3/4 h-24 resize-none focus:outline-none focus:ring-0"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            placeholder="기타사항을 입력하세요"
          />
        </div>
      </div>
    </div>
  );
};

export default TravelSegment;
