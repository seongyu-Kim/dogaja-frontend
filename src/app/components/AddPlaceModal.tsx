import React, { useState, useEffect } from "react";
import Button from "./common/Button";
import Modal from "./Modal";
import { mainApi } from "../utils/mainApi";
import { API } from "../utils/api";
import { SuccessAlert, ErrorAlert } from "../utils/toastAlert";

interface AddPlaceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Schedule {
  id: string;
  title: string;
  category?: string;
}

const AddPlaceModal = ({ isOpen, onClose }: AddPlaceModalProps) => {
  // const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([
    { id: "1", title: "회의", category: "문의" },
    { id: "2", title: "회의", category: "문의" },
    { id: "3", title: "회의", category: "후기" },
    { id: "4", title: "회의", category: "동행" },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      fetchSchedules();
    }
  }, [isOpen]);

  const fetchSchedules = async () => {
    setIsLoading(true);
    try {
      const res = await mainApi({
        url: API.SCHEDULE.SCHEDULE_LIST_GET,
        method: "GET",
        withAuth: true,
      });
      setSchedules(res.data as Schedule[]);
    } catch (e) {
      console.error(e);
      ErrorAlert("일정을 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // const handleAddPlace = async (scheduleId: string) => {
  //   try {
  //     const res = await mainApi({
  //       url: API.PLACE.ADD_TO_SCHEDULE(scheduleId), // Replace with actual API endpoint
  //       method: "POST",
  //       withAuth: true,
  //       data: {
  //         location: "새로운 추천 장소",
  //       },
  //     });

  //     if (res.status === 200) {
  //       SuccessAlert("추천 장소가 추가되었습니다.");
  //       onClose(); // Close the modal after adding the place
  //     }
  //   } catch (e) {
  //     console.error(e);
  //     ErrorAlert("장소 추가에 실패했습니다.");
  //   }
  // };

  return isOpen ? (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="일정 선택" 
      explanation="어떤 일정에 추가하시겠습니까?"
    >
      <div className="max-h-60 overflow-y-auto mb-4">

        {isLoading ? (
          <p>일정을 불러오는 중...</p>
        ) : (
          <div className="space-y-4">
            {schedules.length > 0 ? (
              schedules.map((schedule) => (
                <div
                  key={schedule.id}
                  className="flex justify-between px-4 items-center py-2 border-b border-gray-300"
                >
                  <div>
                    <h3 className="font-semibold">{schedule.title}</h3>
                    <p className="text-sm">{schedule.category}</p>
                  </div>
                  <Button
                    className="bg-mainColor hover:bg-mainHover text-white px-3 py-1 rounded-lg text-sm"
                    onClick={() => SuccessAlert("일정이 추가되엇슴니다람지🐿")}
                  >
                    추가
                  </Button>
                </div>
              ))
            ) : (
              <p>등록된 일정이 없습니다.</p>
            )}
          </div>
        )}
      </div>
    </Modal>
  ) : null;
};

export default AddPlaceModal;
