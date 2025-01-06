import { mainApi } from "@/app/utils/mainApi";
import { API } from "@/app/utils/api";
import { ErrorAlert, SuccessAlert } from "@/app/utils/toastAlert";

export const updateCheckStatus = async (
  scheduleId: string,
  listId: string
) => {
  try {
    const response = await mainApi({
      url: API.SCHEDULE.SCHEDULE_LIST_CHECK(scheduleId, listId),
      method: "PUT",
      withAuth: true,
    });
    return response.data;
  } catch (error) {
    ErrorAlert("상태 업데이트에 실패했습니다.");
    throw error;
  }
};
