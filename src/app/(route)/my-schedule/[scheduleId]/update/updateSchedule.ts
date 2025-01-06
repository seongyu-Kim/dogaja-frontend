import { mainApi } from "@/app/utils/mainApi";
import { API } from "@/app/utils/api";
import { ErrorAlert } from "@/app/utils/toastAlert";
import { UpdateDto } from '@/app/type/scheduleUpdateDto';

export const updateSchedule = async (scheduleId: string, updateDto: UpdateDto) => {
  try {
    const response = await mainApi({
      url: API.SCHEDULE.SCHEDULE_UPDATE(scheduleId),
      method: "PUT",
      data: updateDto,
      withAuth: true,
    });
    return response.data;
  } catch (error) {
    ErrorAlert("일정을 수정하는 중 문제가 발생했습니다.");
    throw error;
  }
};
