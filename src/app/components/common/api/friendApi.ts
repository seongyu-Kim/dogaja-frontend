import { API } from "@/app/utils/api";
import { mainApi } from "@/app/utils/mainApi";
import { SuccessAlert, ErrorAlert } from "@/app/utils/toastAlert";

interface Friend {
  id: string;
  name: string;
}

interface ApiResponse {
  friends: Friend[];
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
      const data = response.data as ApiResponse;

      if (!Array.isArray(data.friends)) {
        throw new Error("응답 데이터 형식이 올바르지 않습니다.");
      }

      return data.friends;
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
    });

    if (res.status === 200) {
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
  const deleteConfirm = confirm("정말 친구 목록에서 삭제하시겠습니까?");
  if (!deleteConfirm) {
    return;
  }

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