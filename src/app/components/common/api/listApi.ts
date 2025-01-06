import { API } from "@/app/utils/api";
import { mainApi } from "@/app/utils/mainApi";
import { SuccessAlert, ErrorAlert } from "@/app/utils/toastAlert";
import { CheckListItem, BucketListItem } from '@/app/type/scheduleDetailType';

export const addBucketListItem  = async (content: BucketListItem, scheduleId: string) => {
  const { SCHEDULE_ADD_BUCKET } = API.SCHEDULE;

  try {
    const res = await mainApi({
      url: SCHEDULE_ADD_BUCKET(scheduleId),
      method: "PUT",
      data: { content },
      withAuth: true,
    });

    SuccessAlert("버킷리스트 아이템이 추가되었습니다.");
    return res.data;
    } catch (error) {
      ErrorAlert("버킷리스트 아이템을 추가하는 중 문제가 발생했습니다.");
      throw error;
  }
};