import React, { useState, useEffect } from "react";
import Button from "./common/Button";
import Modal from "./Modal";
import { mainApi } from "../utils/mainApi";
import { API } from "../utils/api";
import { SuccessAlert, ErrorAlert } from "../utils/toastAlert";

interface AddPlaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlace?: {
    place_name: string;
    address_name: string;
    x: string;
    y: string;
    phone?: string;
  } | null;
}

interface Schedule {
  id: string;
  title: string;
  category?: string;
}

const AddPlaceModal = ({
  isOpen,
  onClose,
  selectedPlace,
}: AddPlaceModalProps) => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
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

  const handleAddPlace = async (scheduleId: string) => {
    if (!selectedPlace) return;

    try {
      const res = await mainApi({
        url: API.SCHEDULE.SCHEDULE_ADD_LOCATION(scheduleId),
        method: "POST",
        data: {
          location: selectedPlace.place_name,
          address: selectedPlace.address_name,
          latitude: selectedPlace.x,
          longitude: selectedPlace.y,
          phone: selectedPlace.phone,
        },
        withAuth: true,
      });

      if (res.status === 201) {
        SuccessAlert("장소가 일정에 추가되었습니다.");
        onClose();
      }
    } catch (e) {
      console.error(e);
      ErrorAlert("장소 추가에 실패했습니다.");
    }
  };

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
                    onClick={() => handleAddPlace(schedule.id)}
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
