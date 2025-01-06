import { API } from "@/app/utils/api";
import { mainApi } from "@/app/utils/mainApi";
import { CreateDto } from "@/app/type/scheduleCreateDto";

export const createSchedule = async (data: CreateDto) => {
  try {
    const { SCHEDULE_CREATE } = API.SCHEDULE;
    const response = await mainApi({
      url: SCHEDULE_CREATE,
      method: "POST",
      data,
      withAuth: true,
    });

    if (response.status === 201) {
      return { success: true, message: "일정이 성공적으로 저장되었습니다!" };
    } else {
      return { success: false, message: "일정 저장 중 문제가 발생했습니다." };
    }
  } catch (error) {
    console.error("Error saving schedule:", error);
    return { success: false, message: "일정 저장 중 오류가 발생했습니다." };
  }
};
