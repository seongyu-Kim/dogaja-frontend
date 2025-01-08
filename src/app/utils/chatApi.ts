"use client";

import { API } from "@/app/utils/api";
import { mainApi } from "@/app/utils/mainApi";
import { ChatRoom } from "@/app/type/ChatType";

//채팅방 목록 불러오기
export const getRoomList = async () => {
  const { CHAT_ROOM_LIST_READ } = API.CHAT;
  try {
    const res = await mainApi({
      url: CHAT_ROOM_LIST_READ,
      method: "GET",
      withAuth: true,
    });

    if (res.status === 200) {
      return res.data as ChatRoom[];
    }
  } catch (e) {
    console.error(e);
  }
};
