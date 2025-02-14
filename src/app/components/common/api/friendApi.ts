import { API } from "@/app/utils/api";
import { mainApi } from "@/app/utils/mainApi";
import { SuccessAlert, ErrorAlert } from "@/app/utils/toastAlert";

interface Friend {
  id: string;
  name: string;
}

// 친구 검색
export const searchFriends = async (name: string): Promise<Friend[]> => {
  const { FRIENDS_SEARCH } = API.FRIENDS;

  try {
    const response = await mainApi({
      url: FRIENDS_SEARCH(name),
      method: "GET",
      withAuth: true,
    });

    if (response.status === 200) {
      return response.data as Friend[];
    } else {
      throw new Error("친구 검색에 실패했습니다.");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 친구 목록 가져오기
export const getFriendList = async (): Promise<Friend[]> => {
  const { FRIENDS_LIST_GET } = API.FRIENDS;

  try {
    const res = await mainApi({
      url: FRIENDS_LIST_GET,
      method: "GET",
      withAuth: true,
    });

    if (res.status === 200) {
      return res.data as Friend[];
    } else {
      throw new Error("Failed to fetch friends list.");
    }
  } catch (error) {
    console.error(error);
    ErrorAlert("친구목록 가져오기에 실패했습니다.");
    throw error;
  }
};

// 친구 추가 요청
export const addFriend = async (friendName: string) => {
  const { FRIENDS_REQUEST_POST } = API.FRIENDS;

  try {
    const res = await mainApi({
      url: FRIENDS_REQUEST_POST,
      method: "POST",
      data: { friendName },
      withAuth: true,
    });

    if (res.status === 201) {
      SuccessAlert("친구 요청이 전송되었습니다.");
      return true;
    } else {
      ErrorAlert("친구 요청 전송에 실패했습니다.");
      return false;
    }
  } catch (error) {
    console.error(error);
    ErrorAlert("친구 요청 전송 중 오류가 발생했습니다.");
    throw error;
  }
};

// 친구 삭제
export const deleteFriend = async (friendId: string) => {
  const { FRIENDS_DELETE } = API.FRIENDS;

  try {
    const res = await mainApi({
      url: FRIENDS_DELETE(friendId),
      method: "DELETE",
      withAuth: true,
    });

    if (res.status === 200) {
      SuccessAlert("친구가 삭제되었습니다.");
      return true;
    } else {
      ErrorAlert("친구 삭제에 실패했습니다.");
      return false;
    }
  } catch (error) {
    console.error(error);
    ErrorAlert("친구 삭제 중 오류가 발생했습니다.");
    throw error;
  }
};

// 나에게 온 요청 목록 가져오기
export const getFriendRequests = async (): Promise<Friend[]> => {
  const { FRIENDS_REQUEST_GET } = API.FRIENDS;
  try {
    const res = await mainApi({
      url: FRIENDS_REQUEST_GET,
      method: "GET",
      withAuth: true,
    });
    if (res.status === 200) {
      return res.data as Friend[];
    }
    throw new Error("Failed to fetch friend requests");
  } catch (error) {
    console.error(error);
    ErrorAlert("친구요청 가져오기에 실패했습니다.");
    throw error; // 오류를 다시 던져 호출한 쪽에서 처리
  }
};

// 요청 수락
export const acceptFriendRequest = async (friendId: string) => {
  const { FRIENDS_REQUEST_PATCH } = API.FRIENDS;
  try {
    const res = await mainApi({
      url: FRIENDS_REQUEST_PATCH(friendId),
      method: "PATCH",
      data: { status: "accepted" },
      withAuth: true,
    });
    if (res.status === 200) {
      return true; // 요청 수락 성공
    }
    throw new Error("Failed to accept friend request");
  } catch (error) {
    console.error(error);
    ErrorAlert("친구요청 수락에 실패했습니다.");
    throw error;
  }
};

// 요청 거절
export const refuseFriendRequest = async (friendId: string) => {
  const { FRIENDS_REQUEST_PATCH } = API.FRIENDS;
  try {
    const res = await mainApi({
      url: FRIENDS_REQUEST_PATCH(friendId),
      method: "PATCH",
      data: { status: "rejected" },
      withAuth: true,
    });
    if (res.status === 200) {
      return true; // 요청 거절 성공
    }
    throw new Error("Failed to refuse friend request");
  } catch (error) {
    console.error(error);
    ErrorAlert("친구요청 거절에 실패했습니다.");
    throw error;
  }
};

// 일정에 친구(동행자) 추가
export const addFriendsToSchedule = async (
  scheduleId: string,
  friends: string[],
) => {
  try {
    const { SCHEDULE_ADD_FRIEND } = API.SCHEDULE;

    if (friends.length > 0) {
      const response = await mainApi({
        url: SCHEDULE_ADD_FRIEND(scheduleId),
        method: "PATCH",
        data: { friends },
        withAuth: true,
      });

      return response;
    }

    return { status: 200, message: "No friends to add." };
  } catch (error) {
    console.error("Error adding friends to schedule:", error);
    throw new Error("친구 추가 중 오류가 발생했습니다.");
  }
};
