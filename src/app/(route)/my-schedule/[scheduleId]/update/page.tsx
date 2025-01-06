"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchSchedule } from '../fetchSchedule';
import { updateSchedule } from './updateSchedule';
import { Schedule, UpdateDto } from "@/app/type/scheduleUpdateDto";
import { SuccessAlert, ErrorAlert } from "@/app/utils/toastAlert";
import { addFriendsToSchedule } from '@/app/components/common/api/friendApi';

import { formatDate } from '@/app/components/common/formatDate';
import { CheckListItem, BucketListItem, TravelLocation } from '@/app/type/scheduleDetailType';
import Checklist from '@/app/components/common/saveSchedule/Checklist';
import AddressBookModal from "@/app/components/AddressBookModal";
import CreateTravleSegment from "@/app/components/common/saveSchedule/TravleSegmant";
import Input from "@/app/components/common/Input";
import SelectImage from "@/app/components/common/SelectImage";

import { IoPersonAddOutline } from "react-icons/io5";

const EditSchedulePage = () => {
  const { scheduleId } = useParams();
  const router = useRouter();

  const [friendsModalOpen, setFriendsModalOpen] = useState(false);

  const [title, setTitle] = useState<string>("");
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
  const [review, setReview] = useState<string>("");
  const [travelDuration, setTravelDuration] = useState<string>();
  const [friendList, setFriendList] = useState<string[]>([]);
  const [checkItems, setCheckItems] = useState<CheckListItem[]>([]);
  const [bucketItems, setBucketItems] = useState<BucketListItem[]>([]);
  const [reviewImage, setReviewImage] = useState<File | null>(null);
  const [locations, setLocations] = useState<TravelLocation[]>([]);

  const addCompanion = (companion: { id: string; name: string }) => {
    setCompanions((prev) => {
      const newCompanions = [...prev, companion];
      setFriendList(newCompanions.map(c => c.name));
      return newCompanions;
    });
  };

  const removeCompanion = (index: number) => {
    setCompanions((prev) => {
      const updatedCompanions = prev.filter((_, i) => i !== index);
      setFriendList(updatedCompanions.map(c => c.name)); // 친구 목록 업데이트
      return updatedCompanions;
    });
  };
  
    // 일정 로드
  useEffect(() => {
    const loadSchedule = async () => {
      try {
        const schedule = await fetchSchedule(scheduleId as string);
        setTitle(schedule.title);
        setDepartureSchedule({
          ...schedule.startInfo,
          date: new Date(schedule.startInfo.date),
        });
        setArrivalSchedule({
          ...schedule.arriveInfo,
          date: new Date(schedule.arriveInfo.date),
        });
        setReview(schedule.review || "");

        const formattedStartDate = formatDate(new Date(schedule.startInfo.date));
        const formattedArriveDate = formatDate(new Date(schedule.arriveInfo.date));

        setTravelDuration(`${formattedStartDate} ~ ${formattedArriveDate}`);
        setFriendList(schedule.friendList.map((friend) => friend.name));
        setCheckItems(schedule.checkList || []);
        setBucketItems(schedule.bucketList || []);
        setLocations(schedule.locations || []);
      } catch (error) {
        ErrorAlert("일정을 불러오는 중 문제가 발생했습니다.");
      }
    };

    loadSchedule();
  }, [scheduleId]);

      // 일정 수정
  const handleUpdate = async () => {
    const updateDto: UpdateDto = {
      scheduleDto: { title },
      startDto: departureSchedule,
      arriveDto: arrivalSchedule,
      reviewDto: { review: review || "" },
    };

    const friends = companions.map(companion => companion.id);

    try {
      const res =  await updateSchedule(scheduleId as string, updateDto);
      await addFriendsToSchedule(scheduleId as string, friends);
      console.log(res);
      SuccessAlert("일정이 성공적으로 수정되었습니다.");
      router.push('/my-schedule');
    } catch (error) {
      console.error(error);
      ErrorAlert("일정을 수정하는 중 문제가 발생했습니다.");
    }
  };

  const handleImageChange = (file: File | null) => {
    setReviewImage(file);
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

          <div className="relative mx-2 w-full lg:w-1/3 opacity-60 pointer-events-none">
            여행 기간
            <div className="flex items-center gap-2 min-w-[300px] text-sm my-3 border border-gray-300 rounded-lg py-1.5 px-3 bg-gray-100">
              <span className="text-gray-400">
                {travelDuration}
              </span>
            </div>
          </div>

          <div className="ml-2 w-full lg:w-1/3">
            동행자
            <div className="flex items-center gap-2 text-sm my-3 border rounded-lg px-3 py-1 w-full">
              <span className="flex flex-wrap gap-1 items-center justify-start w-full min-w-48 overflow-x-auto">
                {friendList.length > 0 ? (
                  friendList.map((friend, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 border border-gray-200 text-mainColor text-xs px-1 py-0.5 my-0.5 rounded-full flex items-center whitespace-nowrap"
                    >
                      {friend}
                      <button
                        onClick={() => removeCompanion(index)} // 삭제 버튼
                        className="text-red-500 ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400">동행자가 없습니다.</span>
                )}
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
          <div className="w-[70%] min-w-[720px]">
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
              <div className="opacity-60 flex w-full gap-2 pointer-events-none">
                <Checklist
                  title="준비물 체크리스트"
                  items={checkItems}
                  type="check"
                  onAddItem={() => {}}
                  onRemoveItem={() => {}}
                />
                <Checklist
                  title="이번 여행 버킷리스트"
                  items={bucketItems}
                  type="bucket"
                  onAddItem={() => {}}
                  onRemoveItem={() => {}}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center mt-2 gap-2 w-[30%] min-w-64">
            <div className="p-4 border border-mainColor rounded-lg w-full">
              <h2>한 줄 후기</h2>
              <div className="flex">
                <SelectImage 
                  onImageChange={handleImageChange}
                  scheduleId={scheduleId as string}
                />
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="border rounded-lg ml-2 text-xs min-w-36 w-full p-2 resize-none focus:outline-none focus:ring-0"
                  placeholder="이번 여행이 어땠는지 소감을 적어주세요!"
                ></textarea>
              </div>
            </div>
            <div className="p-4 border border-mainColor rounded-lg w-full min-h-[396px] max-h-[396px]">
              <h2>일정에 추가 된 장소</h2>
              <div className="overflow-y-auto max-h-[335px] my-2">
              {locations.length > 0 ? (
                locations.map((location) => (
                  <div
                    key={location.id}
                    className="border border-mainColor rounded-lg flex items-center p-2 mt-2"
                  >
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold pb-1">{location.location}</span>
                    <span className="text-xs pb-1">전화번호: {location.phone || "없음"}</span>
                    <span className="text-xs">주소: {location.address || "정보 없음"}</span>
                  </div>
                </div>
                ))
              ) : (
                <p className="text-center text-sm text-gray-500 mt-2">아직 등록된 장소가 없습니다.</p>
              )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleUpdate}
        className="flex items-center justify-center mt-4 bg-mainColor hover:bg-mainHover text-white rounded-lg px-3 py-2"
      >
        저장
      </button>
    </div>


  );
};

export default EditSchedulePage;
