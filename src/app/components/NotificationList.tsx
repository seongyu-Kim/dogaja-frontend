import React, { useEffect, useState } from "react";
import { API } from "@/app/utils/api";
import { mainApi } from "@/app/utils/mainApi";
import { SuccessAlert, ErrorAlert } from "@/app/utils/toastAlert";
import { NotificationType } from "../type/natificationType";
import { isAxiosError } from "axios";

const NotificationList: React.FC = () => {

  const [alarms, setAlarms] = useState<NotificationType[]>([]);
  const [loading, setLoading] = useState(false);

  // 알림 가져오기
  useEffect(() => {
    const getNotifucation = async (): Promise<NotificationType[]> => {
      const { NOTIFICATION_GET } = API.NOTIFICATION;
    
      try {
        const res = await mainApi({
          url: NOTIFICATION_GET,
          method: "GET",
          withAuth: true,
        });
    
        if (res.status === 200) {
          return res.data as NotificationType[];
        } else {
          throw new Error("Failed to fetch notifications.");
        }
      } catch (error) {
        if (isAxiosError(error)) {
          if(error.response?.status === 404) {
            console.error;
          } else {
            ErrorAlert("알림목록 가져오기에 실패했습니다.");
          }
        } 
        throw error;
      }
    };
    getNotifucation()
    .then((data) => {
      const validData = data.filter((item) => item.id && item.type && item.sendername);
      setAlarms(validData);
    })
    .catch((error) => console.error(error));
  }, []);

  // 알림 읽음 처리
  const handleAlarmClick = async (alarm: NotificationType) => {
    const { NOTIFICATION_READ } = API.NOTIFICATION;

    if (loading) return;
    setLoading(true);

    try {
      const res = await mainApi({
        url: NOTIFICATION_READ(alarm.id),
        method: "PATCH",
        withAuth: true,
      });
  
      if (res.status === 200) {
        const updatedAlarms = alarms.map((item) =>
          item.id === alarm.id ? { ...item, isRead: true } : item
        );
        setAlarms(updatedAlarms);
        SuccessAlert(`${alarm.sendername}님이 보내신 알림을 확인했습니다.`);
      } else {
        throw new Error("Failed to mark notification as read.");
      }
    } catch (error) {
      console.error(error);
      ErrorAlert("알림 읽음 처리에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };  

  return (
    <div className="max-h-60 text-sm overflow-y-auto bg-mainColor rounded shadow-lg p-4">
      {alarms.length === 0 ? (
        <p className="text-center text-white text-sm">알림이 없습니다.</p>
      ) : (
        <ul>
          {alarms.map((alarm) => (
            <li
              key={alarm.id}
              className={`flex items-center border-b border-white py-2 cursor-pointer hover:underline transition ${
                alarm.isRead ? "opacity-50" : "opacity-100"
              } ${loading ? "pointer-events-none" : ""}`}
              onClick={() => handleAlarmClick(alarm)}
            >
              <span className="flex-1">
                {alarm.type === "friend_request" &&
                  `🖐 ${alarm.sendername}님의 친구 요청`}
                {alarm.type === "schedule_invite" &&
                  `🎉 ${alarm.sendername}님이 일정에 초대했습니다.`}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationList;
