"use client";

import React, { useState, useEffect  } from "react";
import { useRouter, useParams } from "next/navigation";
import TravelSegment from "@/app/components/common/TravelSegment";
import Checklist from "@/app/components/common/Checklist";
import Input from "@/app/components/common/Input";
import SelectImage from "@/app/components/common/SelectImage";
import AddressBookModal from "@/app/components/AddressBookModal";

import { FriendDto, ScheduleDto, StartDto, ArriveDto, BucketItem, CheckItem } from "@/app/utils/scheduleDto";
import { API } from "@/app/utils/api";
import { mainApi } from "@/app/utils/mainApi";
import { SuccessAlert, ErrorAlert } from "@/app/utils/toastAlert";

import { IoPersonAddOutline } from "react-icons/io5";

function TravelPlannerPage() {
  const { scheduleId } = useParams();

  const [title, setTitle] = useState("");
  const [companions, setCompanions] = useState<string[]>([]);
  const [friendsModalOpen, setFriendsModalOpen] = useState(false);
  
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [arrivalDate, setArrivalDate] = useState<Date | null>(null);
  const [startDepartureLocation, setStartDepartureLocation] = useState("");
  const [endDepartureLocation, setEndDepartureLocation] = useState("");
  const [startArrivalLocation, setStartArrivalLocation] = useState("");
  const [endArrivalLocation, setEndArrivalLocation] = useState("");
  const [departureTransportation, setDepartureTransportation] = useState("");
  const [arrivalTransportation, setArrivalTransportation] = useState("");
  const [departureInfo, setDepartureInfo] = useState("");
  const [arrivalInfo, setArrivalInfo] = useState("");
  
  const [checklist, setChecklist] = useState<{ text: string; checked: boolean }[]>([]);
  const [newChecklistItem, setNewChecklistItem] = useState("");
  const [bucketList, setBucketList] = useState<{ text: string; checked: boolean }[]>([]);
  const [newBucketItem, setNewBucketItem] = useState("");
  
  useEffect(() => {
    // 컴포넌트가 마운트될 때 더미 동행자 데이터를 추가합니다.
    const dummyCompanions = ["엘리스", "김토끼", "이토끼", "박토끼","홍길동", "홍길순"];
    setCompanions(dummyCompanions);
  }, []);

  const toggleFriendAddModal = () => {
    setFriendsModalOpen(!friendsModalOpen); // 모달 상태 토글
  };

  const removeCompanion = (index: number) => {
    setCompanions(companions.filter((_, i) => i !== index));
  };

  const addCompanion = (nickname: string) => {
    if (!companions.includes(nickname)) {
      setCompanions([...companions, nickname]);
    }
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

  const saveSchedule = async () => {

    if (!title || !departureDate || !arrivalDate) {
      ErrorAlert("필수 항목을 입력하세요.");
      return;
    }

    const { SCHEDULE_CREATE, SCHEDULE_ADD_BUCKET, SCHEDULE_ADD_CHECKLIST } = API.SCHEDULE;

    // DTO 데이터 생성
    const scheduleDto: ScheduleDto = {
      title,
    };

    const startDto: StartDto = {
      date: departureDate.toISOString() || "",
      start: startDepartureLocation,
      arrive: endDepartureLocation,
      vehicle: departureTransportation,
      etc: departureInfo,
      type: "start",
    };

    const arriveDto: ArriveDto = {
      date: arrivalDate.toISOString() || "",
      start: startArrivalLocation,
      arrive: endArrivalLocation,
      vehicle: arrivalTransportation,
      etc: arrivalInfo,
      type: "arrive",
    };

    const bucketItems: BucketItem[] = bucketList.map((item) => ({
      content: item.text,
      type: "bucket",
    }));

    const checkItems: CheckItem[] = checklist.map((item) => ({
      content: item.text,
      type: "check",
    }));

    const companionsDto: FriendDto[] = companions.map((name) => ({ name }));

    const data = {
      schedule: scheduleDto,
      start: startDto,
      arrive: arriveDto,
      bucketList: bucketItems,
      checklist: checkItems,
      companions: companionsDto,
    };

    try {
      const response = await mainApi({
        url: SCHEDULE_CREATE,
        method: "POST",
        data,
      });

      if (response.status === 200) {
        SuccessAlert("일정이 성공적으로 저장되었습니다!");

        const scheduleId = response.data.id;

        const bucketPromises = bucketItems.map((item) =>
          mainApi({
            url: SCHEDULE_ADD_BUCKET(scheduleId),
            method: "POST",
            data: {
              content: item.content,
              type: item.type,
            },
          })
        );

        const checklistPromises = checkItems.map((item) =>
          mainApi({
            url: SCHEDULE_ADD_CHECKLIST(scheduleId),
            method: "POST",
            data: {
              content: item.content,
              type: item.type,
            },
          })
        );
  
        // 모든 비동기 작업 병렬 실행
        await Promise.all([...bucketPromises, ...checklistPromises]);

      } else {
        ErrorAlert("일정 저장 중 문제가 발생했습니다.d");
      }
    } catch (error) {
      console.error("Error saving schedule:", error);
      ErrorAlert("일정 저장 중 문제가 발생했습니다.s");
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
            여행 기간<span className="text-red-500 ml-1">*</span>
            <div className="flex items-center gap-2 min-w-[300px] text-sm my-3 border border-gray-300 rounded-lg py-1.5 px-3">
              <span className="text-gray-400">아래에서 출발/도착 기간을 선택해주세요</span>
            </div>
          </div>
          <div className="ml-2 w-full lg:w-1/3">
            동행자
            <div className="flex items-center gap-2 text-sm my-3 border rounded-lg px-3 py-1 w-full">
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
        <AddressBookModal
          isOpen={friendsModalOpen}
          onClose={() => setFriendsModalOpen(false)}
          onAddFriend={addCompanion}
          isSchedulePage={true}
        />
        <div className="flex justify-center w-full min-w-[950px] gap-2">
          <div className="w-[70%] min-w-[720px]">
            <div className="flex justify-center mt-2 gap-2 w-full">
              <TravelSegment
                title="출발"
                departureTime={departureDate}
                arrivalTime={arrivalDate}
                departure={startDepartureLocation}
                arrival={endDepartureLocation}
                transportation={departureTransportation}
                additionalInfo={departureInfo}
                setDepartureTime={setDepartureDate}
                setArrivalTime={setArrivalDate}
                setDeparture={setStartDepartureLocation}
                setArrival={setEndDepartureLocation}
                setTransportation={setDepartureTransportation}
                setAdditionalInfo={setDepartureInfo}
              />
              <TravelSegment
                title="도착"
                departureTime={departureDate}
                arrivalTime={arrivalDate}
                departure={startArrivalLocation}
                arrival={endArrivalLocation}
                transportation={arrivalTransportation}
                additionalInfo={arrivalInfo}
                setDepartureTime={setDepartureDate}
                setArrivalTime={setArrivalDate}
                setDeparture={setStartArrivalLocation}
                setArrival={setEndArrivalLocation}
                setTransportation={setArrivalTransportation}
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
      <button 
        onClick={saveSchedule}
        className="flex items-center justify-center mt-4 bg-mainColor hover:bg-mainHover text-white rounded-lg px-3 py-2">
        저장
      </button>

    </div>
  );
}

export default TravelPlannerPage;
