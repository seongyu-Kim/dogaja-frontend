"use client";

import React, { useState } from "react";
import { Schedule } from "@/app/type/scheduleCreateDto";
import Input from '../Input';
import { ErrorAlert } from "@/app/utils/toastAlert";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { FaRegCalendarCheck  } from "react-icons/fa";

interface TravelSegmentsProps {
  schedule: Schedule;
  setSchedule: (updatedSchedule: Schedule) => void;
}

const CreateTravleSegment: React.FC<TravelSegmentsProps> = ({ schedule, setSchedule }) => {
  
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleDateChange = (date: Date | null) => {
    if (schedule.type === "arrive" && schedule.date && date && date < schedule.date) {
      ErrorAlert("도착 시간은 출발 시간보다 이후여야 합니다.");
    } else {
      setSchedule({...schedule, date});
    }
  };

  return (
    <div className="border rounded-lg border-mainColor p-4 w-full">
      <div className="flex">
        <h2 className="font-bold mb-2">{schedule.type === "start" ? "출발" : "도착"}</h2>
        <span className="text-red-500 ml-1">*</span>
      </div>
      <div className="flex flex-col gap-2 border-t border-mainColor pt-2">
        <div className="flex items-center text-sm mb-1">
          <span className="pr-2 w-1/4">날짜/시간</span>
          <div className="flex items-center justify-between w-3/4 border border-gray-300 rounded-lg px-3 py-1">
            <DatePicker
              selected={schedule.date}
              onChange={handleDateChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={10}
              dateFormat="yyyy/MM/dd HH:mm"
              placeholderText="날짜 및 시간을 선택하세요"
              open={isDatePickerOpen}
              className="focus:outline-none w-full"
              onClickOutside={() => setIsDatePickerOpen(false)}
            />
            <FaRegCalendarCheck
              className="cursor-pointer text-mainColor text-lg"
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
            />
          </div>
        </div>
        <div className="flex items-center text-sm mb-1">
          <span className="pr-2 w-1/4">출발지</span>
          <Input
            type="text"
            name="departureLocation"
            placeholder="출발지를 입력하세요"
            value={schedule.start}
            onChange={(e) => setSchedule({ ...schedule, start: e.target.value })}
            className="border rounded px-3 py-1 w-3/4"
          />
        </div>
        <div className="flex items-center text-sm mb-1">
          <span className="pr-2 w-1/4">도착지</span>
          <Input
            type="text"
            name="arrival"
            placeholder="도착지를 입력하세요"
            value={schedule.arrive}
            onChange={(e) => setSchedule({ ...schedule, arrive: e.target.value })}
            className="border rounded px-3 py-1 w-3/4"
          />
        </div>
        <div className="flex items-center text-sm mb-1">
          <span className="pr-2 w-1/4">교통 수단</span>
          <Input
            type="text"
            name="transportation"
            placeholder="교통 수단을 입력하세요"
            value={schedule.vehicle}
            onChange={(e) => setSchedule({ ...schedule, vehicle: e.target.value })}
            className="border rounded px-3 py-1 w-3/4"
          />
        </div>
        <div className="flex items-center text-sm mb-1">
          <span className="pr-2 w-1/4">기타사항</span>
          <textarea
            className="border rounded px-3 py-1 w-3/4 h-24 resize-none focus:outline-none focus:ring-0"
            value={schedule.etc}
            onChange={(e) => setSchedule({ ...schedule, etc: e.target.value })}
            placeholder="기타사항을 입력하세요"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateTravleSegment;
