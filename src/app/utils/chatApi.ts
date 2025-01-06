"use client";

import { API } from "@/app/utils/api";
import { mainApi } from "@/app/utils/mainApi";

// 채팅방 생성 또는 참여
export const createRoomOrJoin = async (userId: string) => {
  const { CHAT_ROOM_CREATE_OR_JOIN } = API.CHAT;
  try {
    const res = await mainApi({
      url: CHAT_ROOM_CREATE_OR_JOIN,
      method: "POST",
      data: { userId: userId },
    });

    if (res.status === 200) {
      return res.data;
    }
  } catch (e) {
    console.error(e);
  }
};

// 채팅방 참여 (생성된 채팅방에 관리자가 참여)
export const joinRoom = async (roomId: number, userId: string) => {
  const { CHAT_JOIN_ROOM } = API.CHAT;
  try {
    const res = await mainApi({
      url: CHAT_JOIN_ROOM,
      method: "POST",
      data: { roomId: roomId, userId: userId },
    });

    if (res.status === 200) {
      return res.data;
    }
  } catch (e) {
    console.error(e);
  }
};

// 관리자 기준 채팅방 조회
export const adminRoomRead = async (data: {
  roomId: number;
  adminId: string;
}) => {
  const { CHAT_ROOM_READ_ADMIN } = API.CHAT;
  try {
    const res = await mainApi({
      url: CHAT_ROOM_READ_ADMIN,
      method: "POST",
      data: data,
      withAuth: true,
    });

    if (res.status === 200) {
      return res.data;
    }
  } catch (e) {
    console.error(e);
  }
};

// 채팅방 메시지 조회(유저 기준)
export const messageRead = async (roomId: number) => {
  const { CHAT_MSG_READ_USER } = API.CHAT;
  try {
    const res = await mainApi({
      url: CHAT_MSG_READ_USER,
      method: "POST",
      data: { roomId: roomId },
    });

    if (res.status === 200) {
      return res.data;
    }
  } catch (e) {
    console.error(e);
  }
};

// 메시지 전송
export const sendMessage = async (roomId: number, message: string) => {
  const { CHAT_SEND_MSG } = API.CHAT;
  try {
    const res = await mainApi({
      url: CHAT_SEND_MSG,
      method: "POST",
      data: { roomId: roomId, message: message },
    });

    if (res.status === 200) {
      return res.data;
    }
  } catch (e) {
    console.error(e);
  }
};

// 채팅방 나가기
export const roomLeave = async (roomId: number) => {
  const { CHAT_ROOM_LEAVE } = API.CHAT;
  try {
    const res = await mainApi({
      url: CHAT_ROOM_LEAVE,
      method: "POST",
      data: { roomId: roomId },
    });

    if (res.status === 200) {
      return res.data;
    }
  } catch (e) {
    console.error(e);
  }
};
