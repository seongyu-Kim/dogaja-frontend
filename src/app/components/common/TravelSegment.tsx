import React, { useState } from "react";
import Input from './Input';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { SuccessAlert, ErrorAlert } from "@/app/utils/toastAlert";

import { FaRegCalendarCheck  } from "react-icons/fa";

interface TravelSegmentProps {
  title: string;
  departureTime: Date | null;
  arrivalTime: Date | null;
  departure: string;
  arrival: string;
  transportation: string;
  additionalInfo: string;
  setDepartureTime: (value: Date | null) => void;
  setArrivalTime: (value: Date | null) => void;
  setDeparture: (value: string) => void;
  setArrival: (value: string) => void;
  setTransportation: (value: string) => void;
  setAdditionalInfo: (value: string) => void;
}

const TravelSegment: React.FC<TravelSegmentProps> = ({
  title,
  departureTime,
  arrivalTime,
  departure,
  arrival,
  transportation,
  additionalInfo,
  setDepartureTime,
  setArrivalTime,
  setDeparture,
  setArrival,
  setTransportation,
  setAdditionalInfo,
}) => {

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleArrivalChange = (date: Date | null) => {
    if (departureTime && date && date < departureTime) {
      ErrorAlert("도착 시간은 출발 시간보다 이후여야 합니다.");
    } else {
      setArrivalTime(date);
    }
  };

  return (
    <div className="border rounded-lg border-mainColor p-4 w-full">
      <h2 className="font-bold mb-2">{title}</h2>
      <div className="flex flex-col gap-2 border-t border-mainColor pt-2">
      {title === "출발" || title === "도착" ? (
          <div className="flex items-center text-sm mb-1">
            <span className="pr-2 w-1/4">날짜/시간</span>
            <div className="flex items-center w-3/4 border rounded-lg px-3 py-1">
              <DatePicker
                selected={title === "출발" ? departureTime : arrivalTime}
                onChange={title === "출발" ? setDepartureTime : handleArrivalChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={10}
                dateFormat="yyyy/MM/dd HH:mm"
                placeholderText={`${title} 날짜 및 시간을 선택하세요`}
                open={isDatePickerOpen}
                className="focus:outline-none"
                onClickOutside={() => setIsDatePickerOpen(false)}
              />
              <FaRegCalendarCheck
                className="cursor-pointer text-mainColor text-lg"
                onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              />
            </div>
          </div>
        ) : null}
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
