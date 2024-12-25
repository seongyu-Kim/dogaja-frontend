import React, { useState } from "react";
import Modal from "./Modal";

const ScheduleSelectModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const schedules = [
    { id: 1, title: "회의 일정" },
    { id: 2, title: "운동 일정" },
    { id: 3, title: "친구 모임" },
    { id: 4, title: "프로젝트 작업" },
    { id: 5, title: "여행" },
    { id: 6, title: "출장" },
    { id: 7, title: "개발" },
  ];

  const handleAddToSchedule = (scheduleId: number) => {
    console.log(`일정 추가: ${scheduleId}`);
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="일정 선택" 
      explanation="어떤 일정에 추가하시겠습니까?"
    >
      <div className="max-h-60 overflow-y-auto mb-4">
        <ul className="mb-4">
          {schedules.map(schedule => (
            <li 
              key={schedule.id} 
              className="flex justify-between px-4 items-center py-2 border-b border-gray-300"
            >
              <span>{schedule.title}</span>
              <button
                className="bg-mainColor hover:bg-mainHover text-white px-3 py-1 rounded-lg text-sm"
                onClick={() => handleAddToSchedule(schedule.id)}
              >
                추가
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
};

export default ScheduleSelectModal;
