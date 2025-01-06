import { mainApi } from "@/app/utils/mainApi";
import { API } from "@/app/utils/api";
import { ErrorAlert } from "@/app/utils/toastAlert";
import { TravelPlan } from '@/app/type/scheduleDetailType';

export const fetchSchedule = async (scheduleId: string) => {
  try {
    const response = await mainApi({
      url: API.SCHEDULE.SCHEDULE_GET(scheduleId),
      method: "GET",
      withAuth: true,
    });
    return response.data as TravelPlan;
  } catch (error) {
    ErrorAlert("일정을 불러오는 중 문제가 발생했습니다.");
    throw error;
  }
};
