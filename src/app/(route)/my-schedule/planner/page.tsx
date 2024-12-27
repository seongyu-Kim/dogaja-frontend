"use client";

import React, { useState, useEffect  } from "react";
import TravelSegment from "@/app/components/common/TravelSegment";
import Checklist from "@/app/components/common/Checklist";
import Input from "@/app/components/common/Input";
import FriendAddModal from "@/app/components/FriendAddModal";
import SelectImage from "@/app/components/common/SelectImage";

import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // 기본 스타일
import "react-date-range/dist/theme/default.css"; // 테마 스타일
import "@/app/style/custom-date-range.css";
import { differenceInDays } from "date-fns";

import { FaRegCalendarCheck  } from "react-icons/fa";
import { IoPersonAddOutline } from "react-icons/io5";

interface DateRangeType {
  startDate: Date | null;
  endDate: Date | null;
  key: string;
}

function TravelPlannerPage() {
  const [title, setTitle] = useState("");
  const [companions, setCompanions] = useState<string[]>([]);
  const [newCompanion, setNewCompanion] = useState("");
  const [friendsModalOpen, setFriendsModalOpen] = useState(false);

  const [checklist, setChecklist] = useState<{ text: string; checked: boolean }[]>([]);
  const [newChecklistItem, setNewChecklistItem] = useState("");
  const [bucketList, setBucketList] = useState<{ text: string; checked: boolean }[]>([]);
  const [newBucketItem, setNewBucketItem] = useState("");

  const [departureDate, setDepartureDate] = useState("");
  const [departureLocation, setDepartureLocation] = useState("");
  const [arrivalLocation, setArrivalLocation] = useState("");
  const [transportation, setTransportation] = useState("");
  const [departureInfo, setDepartureInfo] = useState("");
  const [arrivalInfo, setArrivalInfo] = useState("");

  useEffect(() => {
    // 컴포넌트가 마운트될 때 더미 동행자 데이터를 추가합니다.
    const dummyCompanions = ["엘리스", "김토끼", "이토끼", "박토끼","홍길동", "홍길순"];
    setCompanions(dummyCompanions);
  }, []);

  // 초기 날짜 범위 설정
  const [dateRange, setDateRange] = useState<DateRangeType[]>([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);

  // 달력 관련 상태
  const [showCalendar, setShowCalendar] = useState(false);
  const nights =
    dateRange[0].startDate && dateRange[0].endDate
      ? differenceInDays(dateRange[0].endDate, dateRange[0].startDate)
      : 0;
  const days = nights + 1;

  const toggleCalendar = () => setShowCalendar(!showCalendar);

  const addCompanion = () => {
    setNewCompanion("");
  };

  const toggleFriendAddModal = () => {
    setFriendsModalOpen(!friendsModalOpen); // 모달 상태 토글
  };

  const removeCompanion = (index: number) => {
    setCompanions(companions.filter((_, i) => i !== index));
  };

  const addChecklistItem = () => {
    if (newChecklistItem.trim() === "") return;
    setChecklist([...checklist, { text: newChecklistItem, checked: false }]);
    setNewChecklistItem("");
  };

  const removeChecklistItem = (index: number) => {
    setChecklist(checklist.filter((_, i) => i !== index));
  };

  const toggleItemCheckbox = (index: number) => {
    setChecklist(
      checklist.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const addBucketItem = () => {
    if (newBucketItem.trim()) {
      setBucketList([...bucketList, { text: newBucketItem, checked: false }]);
      setNewBucketItem("");
    }
  };

  const removeBucketItem = (index: number) => {
    setBucketList(bucketList.filter((_, i) => i !== index));
  };

  const toggleBucketCheckbox = (index: number) => {
    setBucketList(
      bucketList.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <div className="p-6 space-y-2 flex flex-col justify-center items-center mx-auto w-full max-w-[1100px]">
      <div className="flex flex-col justify-between items-start w-full gap-2">
        <div className="flex w-full justify-between items-center pt-2 mt-2">
          <div className="mr-2 w-full lg:w-1/3">
            여행 제목
            <Input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="여행 제목을 입력하세요"
              className="w-full border rounded px-3 py-2 text-sm min-w-32"
            />
          </div>
          <div className="relative mx-2 w-full lg:w-1/3">
            여행 기간
            <div className="flex items-center gap-2 min-w-[300px] text-sm my-3">
              {/* 달력 아이콘 */}
              <p>
                {dateRange[0].startDate
                  ? dateRange[0].startDate.toLocaleDateString()
                  : "시작일 미정"}{" "}
                ~{" "}
                {dateRange[0].endDate
                  ? dateRange[0].endDate.toLocaleDateString()
                  : "종료일 미정"}{" "}
                ({nights}박 {days}일)
              </p>
              <button onClick={toggleCalendar} className="text-mainColor">
                <FaRegCalendarCheck className="text-xl hover:scale-110" />
              </button>
            </div>
            {showCalendar && (
              <div className="absolute z-10 mt-2">
                <DateRange
                  editableDateInputs={true}
                  onChange={(ranges) => setDateRange([ranges.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={dateRange}
                />
              </div>
            )}
          </div>
          <div className="ml-2 w-full lg:w-1/3">
            동행자
            <div className="flex items-center gap-2 text-sm border rounded-lg px-3 py-1 w-full">
              <span className="flex flex-wrap gap-1 items-center justify-start w-full min-w-48 overflow-x-auto">
                {companions.map((companion, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 border border-gray-200 text-mainColor text-xs px-1 py-0.5 my-0.5 rounded-full flex items-center whitespace-nowrap"
                  >
                    {companion}
                    <button
                      onClick={() => removeCompanion(index)} // 삭제 버튼
                      className="text-red-500 ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </span>
              <button
                onClick={toggleFriendAddModal}
                className="text-mainColor text-xl"
              >
                <IoPersonAddOutline className="hover:scale-110"/>
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full min-w-[950px] gap-2">
          <div className="w-[70%] min-w-[720px]">
            <div className="flex justify-center mt-2 gap-2 w-full">
              <TravelSegment
                title="출발"
                departure={departureDate}
                arrival={departureLocation}
                transportation={transportation}
                additionalInfo={departureInfo}
                setDeparture={setDepartureDate}
                setArrival={setDepartureLocation}
                setTransportation={setTransportation}
                setAdditionalInfo={setDepartureInfo}
              />
              <TravelSegment
                title="도착"
                departure={arrivalLocation}
                arrival={arrivalLocation}
                transportation={transportation}
                additionalInfo={arrivalInfo}
                setDeparture={setArrivalLocation}
                setArrival={setArrivalLocation}
                setTransportation={setTransportation}
                setAdditionalInfo={setArrivalInfo}
              />
            </div>

            <div className="flex items-center mt-2 gap-2">
              <Checklist
                title="준비물 체크리스트"
                checklist={checklist}
                newChecklistItem={newChecklistItem}
                setNewChecklistItem={setNewChecklistItem}
                addChecklistItem={addChecklistItem}
                toggleCheckbox={toggleItemCheckbox}
                removeChecklistItem={removeChecklistItem}
              />
              <Checklist
                title="이번 여행 버킷리스트"
                checklist={bucketList}
                newChecklistItem={newBucketItem}
                setNewChecklistItem={setNewBucketItem}
                addChecklistItem={addBucketItem}
                toggleCheckbox={toggleBucketCheckbox}
                removeChecklistItem={removeBucketItem}
              />
            </div>
          </div>

          <div className="flex flex-col items-center mt-2 gap-2 w-[30%] min-w-64">
            <div className="p-4 border border-mainColor rounded-lg w-full">
              <h2>한 줄 후기</h2>
              <div className="flex">
                <SelectImage comment={false} descriptionText="" />
                <textarea
                  className="border rounded-lg ml-2 text-xs min-w-36 w-full p-2 resize-none focus:outline-none focus:ring-0"
                  placeholder="이번 여행이 어땠는지 소감을 적어주세요!">

                </textarea>
              </div>
            </div>
            <div className="p-4 border border-mainColor rounded-lg w-full min-h-[394px]">
              <h2>일정에 추가 된 장소</h2>
              <div>
                <div className="border border-mainColor rounded-lg flex items-center p-2 mt-2">
                  <div className="border rounded-lg bg-gray-200 p-2 mr-2">
                    <h2>이미지</h2>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs pb-2">ㅇㅇ식당</span>
                    <span className="text-xs">전화번호 : </span>
                    <span className="text-xs">주소 : </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="flex items-center justify-center mt-4 bg-mainColor hover:bg-mainHover text-white rounded-lg px-3 py-2">
        저장
      </button>
      <FriendAddModal isOpen={friendsModalOpen} onClose={toggleFriendAddModal} />
    </div>
  );
}

export default TravelPlannerPage;
