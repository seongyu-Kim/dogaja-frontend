"use client";

import React, { useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import { useRouter } from "next/navigation";
import { createSchedule } from "./createSchedule";
import { CreateDto, Schedule } from "@/app/type/scheduleCreateDto";
import { CheckItem } from "@/app/type/scheduleCreateDto";
import { SuccessAlert } from "@/app/utils/toastAlert";
import { formatDate } from '@/app/components/common/formatDate';

import CreateTravleSegment from "@/app/components/common/saveSchedule/TravleSegmant";
import Input from "@/app/components/common/Input";
import AddressBookModal from "@/app/components/AddressBookModal";
import Checklist from "@/app/components/common/saveSchedule/Checklist";

import { IoPersonAddOutline } from "react-icons/io5";

const CreateSchedulePage = () => {
  const router = useRouter();
  const { scheduleId } = useParams();

  const [friendsModalOpen, setFriendsModalOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [travelDuration, setTravelDuration] = useState("");
  const [companions, setCompanions] = useState<{ id: string; name: string }[]>([]);
  const [departureSchedule, setDepartureSchedule] = useState<Schedule>({
    date: null,
    start: "",
    arrive: "",
    vehicle: "",
    etc: "",
    type: "start",
  });
  const [arrivalSchedule, setArrivalSchedule] = useState<Schedule>({
    date: null,
    start: "",
    arrive: "",
    vehicle: "",
    etc: "",
    type: "arrive",
  });
  const [checkItems, setCheckItems] = useState<CheckItem[]>([]);
  const [bucketItems, setBucketItems] = useState<CheckItem[]>([]);

  const addCompanion = (companion: { id: string; name: string }) => {
    setCompanions((prev) => [...prev, companion]);
  };

  const removeCompanion = (index: number) => {
    setCompanions((prev) => prev.filter((_, i) => i !== index));
  };

  // 체크리스트
  const handleAddCheckItem = (newItem: CheckItem) => {
    setCheckItems([...checkItems, newItem]);
  };
  const handleRemoveCheckItem = (index: number) => {
    setCheckItems(checkItems.filter((_, i) => i !== index));
  };
  const handleAddBucketItem = (newItem: CheckItem) => {
    setBucketItems((prevItems) => [...prevItems, newItem]); // 버킷리스트에 항목 추가
  };
  const handleRemoveBucketItem = (index: number) => {
    setBucketItems((prevItems) => prevItems.filter((_, i) => i !== index)); // 버킷리스트에서 항목 제거
  };

  // 여행기간 표시
  useEffect(() => {
    if (departureSchedule.date && arrivalSchedule.date) {
      const start = formatDate(departureSchedule.date);
      const end = formatDate(arrivalSchedule.date);
      setTravelDuration(`${start} ~ ${end}`);
    } else {
      setTravelDuration("");
    }
  }, [departureSchedule.date, arrivalSchedule.date]);

  const handleSave = async () => {

    const checkDto = checkItems.map(item => ({
      content: item.content,
      type: item.type
    }));

    const bucketDto = bucketItems.map(item => ({
      content: item.content,
      type: item.type
    }));

    const createDto: CreateDto = {
      scheduleDto: { title },
      startDto: departureSchedule,
      arriveDto: arrivalSchedule,
      bucketDto: bucketDto,
      checkDto: checkDto,
      friendDto: companions.map(companion => companion.id),
    };

    const response = await createSchedule(scheduleId as string, createDto, companions.map(companion => companion.id));
    if (response) {
      SuccessAlert("일정이 성공적으로 저장되었습니다.");
      router.push("/my-schedule");
      console.log("Created schedule:", response);
    }
  };

  return (
    <div className="p-6 space-y-2 flex flex-col justify-center items-center mx-auto w-full max-w-[1100px]">
      <div className="flex flex-col justify-between items-start w-full gap-2">
        <p className="text-gray-400 text-xs">* 는 필수항목입니다.</p>
        <div className="flex w-full justify-between pt-2 mt-2">
          <div className="mx-2 w-full lg:w-1/3">
            여행 제목<span className="text-red-500 ml-1">*</span>
            <Input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="여행 제목을 입력하세요"
              className="w-full border rounded px-3 py-1.5 my-3 text-sm min-w-32"
            />
          </div>
          <div className="relative mx-2 w-full lg:w-1/3">
            여행 기간
            <div className="flex items-center gap-2 min-w-[300px] text-sm my-3 border border-gray-300 rounded-lg py-1.5 px-3">
              <span className="text-gray-400">
                {travelDuration || "아래에서 출발/도착 기간을 선택해주세요"}
              </span>
            </div>
          </div>
          <div className="ml-2 w-full lg:w-1/3">
            동행자
            <div className="flex items-center gap-2 text-sm my-3 border border-gray-300 rounded-lg px-3 py-1 w-full">
              <span className="flex flex-wrap gap-1 items-center justify-start w-full min-w-48 overflow-x-auto">
                {companions.map((companion, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 border border-gray-200 text-mainColor text-xs px-1 py-0.5 my-0.5 rounded-full flex items-center whitespace-nowrap"
                  >
                    {companion.name}
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
                onClick={() => setFriendsModalOpen(true)}
                className="text-mainColor text-xl"
              >
                <IoPersonAddOutline className="hover:scale-110"/>
              </button>
            </div>
          </div>
        </div>
        <AddressBookModal
          isOpen={friendsModalOpen}
          onClose={() => setFriendsModalOpen(false)}
          onAddFriend={addCompanion}
          isSchedulePage={true}
        />
        <div className="flex justify-center w-full min-w-[950px] gap-2">
          <div className="w-full min-w-[720px]">
            <div className="flex justify-center mt-2 gap-2 w-full">
              <CreateTravleSegment
                schedule={departureSchedule}
                setSchedule={setDepartureSchedule}
              />
              <CreateTravleSegment
                schedule={arrivalSchedule}
                setSchedule={setArrivalSchedule}
              />
            </div>

            <div className="flex items-center mt-2 gap-2">
              <Checklist
                title="준비물 체크리스트"
                items={checkItems}
                type="check"
                onAddItem={handleAddCheckItem}
                onRemoveItem={handleRemoveCheckItem}
              />
              <Checklist
                title="이번 여행 버킷리스트"
                items={bucketItems}
                type="bucket"
                onAddItem={handleAddBucketItem}
                onRemoveItem={handleRemoveBucketItem}
              />
            </div>
          </div>
        </div>
      </div>
        <button 
          onClick={handleSave}
          className="flex items-center justify-center mt-4 bg-mainColor hover:bg-mainHover text-white rounded-lg px-3 py-2">
          저장
        </button>
    </div>
  );
};

export default CreateSchedulePage;
