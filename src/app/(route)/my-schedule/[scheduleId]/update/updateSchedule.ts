import { mainApi } from "@/app/utils/mainApi";
import { API } from "@/app/utils/api";
import { ErrorAlert } from "@/app/utils/toastAlert";
import { UpdateDto } from '@/app/type/scheduleUpdateDto';

export const updateSchedule = async (
  scheduleId: string, 
  updateDto: UpdateDto, 
  // imageFile?: File | null
) => {
  try {
    // const formData = new FormData();

    // // JSON 데이터를 FormData에 추가
    // formData.append("data", JSON.stringify(updateDto));

    // // 이미지 파일이 있으면 FormData에 추가
    // if (imageFile) {
    //   formData.append("image", imageFile);
    // }

    const response = await mainApi({
      url: API.SCHEDULE.SCHEDULE_UPDATE(scheduleId),
      method: "PUT",
      data: updateDto,
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
      withAuth: true,
    });

    return response.data;
  } catch (error) {
    ErrorAlert("일정을 수정하는 중 문제가 발생했습니다.");
    throw error;
  }
};
