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
    <Modal isOpen={isOpen} onClose={onClose} title="장소 추가">
      <div className="p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">추천 장소 추가</h2>

        {isLoading ? (
          <p>일정을 불러오는 중...</p>
        ) : (
          <div className="space-y-4">
            {schedules.length > 0 ? (
              schedules.map((schedule) => (
                <div
                  key={schedule.id}
                  className="flex justify-between items-center p-2 border-b"
                >
                  <div>
                    <h3 className="font-semibold">{schedule.title}</h3>
                    <p className="text-sm">{schedule.category}</p>
                  </div>
                  <Button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={() => SuccessAlert("일정이 추가되엇슴니다람지")}
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

        <div className="flex justify-end mt-4">
          <Button
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            닫기
          </Button>
        </div>
      </div>
    </Modal>
  ) : null;
};

export default AddPlaceModal;
