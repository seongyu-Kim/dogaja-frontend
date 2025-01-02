"use client";
import { io, Socket } from "socket.io-client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useUserStore } from "@/app/store/userStore";
import notFound from "@/app/not-found";
import { ChatRoom, MessageType } from "@/app/type/ChatType";

const chatSocket: Socket = io(`${process.env.NEXT_PUBLIC_SOKET_URL}`);

export default function ChatPage() {
  //임시 - 아래 타입들 API 나오기 전에 상상코딩된 부분이라 수정 예정
  const [chatLog, setChatLog] = useState<MessageType[]>([
    {
      message: "더미데이터~",
      timestamp: "오후 2:30",
      user: "me",
    },
    {
      message: "더미데이터2",
      timestamp: "오후 2:31",
      user: "other",
    },
    {
      message: "더미데이터2",
      timestamp: "오후 2:31",
      user: "other",
    },
    {
      message: "더미데이터~",
      timestamp: "오후 2:30",
      user: "me",
    },
    {
      message: "더미데이터~",
      timestamp: "오후 2:30",
      user: "me",
    },
    {
      message: "더미데이터2",
      timestamp: "오후 2:31",
      user: "other",
    },
    {
      message: "더미데이터2",
      timestamp: "오후 2:31",
      user: "other",
    },
    {
      message: "더미데이터2",
      timestamp: "오후 2:31",
      user: "other",
    },
    {
      message: "더미데이터2",
      timestamp: "오후 2:31",
      user: "other",
    },
    {
      message: "더미데이터2",
      timestamp: "오후 2:31",
      user: "other",
    },
    {
      message: "더미데이터2",
      timestamp: "오후 2:31",
      user: "other",
    },
    {
      message: "더미데이터2",
      timestamp: "오후 2:31",
      user: "other",
    },
    {
      message: "더미데이터2",
      timestamp: "오후 2:31",
      user: "other",
    },
    {
      message: "더미데이터2",
      timestamp: "오후 2:31",
      user: "other",
    },
    {
      message: "더미데이터~",
      timestamp: "오후 2:30",
      user: "me",
    },
    {
      message: "더미데이터2",
      timestamp: "오후 2:31",
      user: "other",
    },
  ]);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const messageRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { user } = useUserStore();

  // 변경될 때마다 스크롤을 하단으로 이동
  useEffect(() => {
    if (selectedRoom) {
      scrollToBottom();
    }
  }, [selectedRoom]);

  // 초기 채팅방 목록 가져오기
  useEffect(() => {
    //대충 axios로 채팅방 목록 가져오고 setChatRooms에 데이터 넣어주고 아래에 함수 실행~
    console.log("채팅방 목록 불러옴~~");
    setChatRooms([
      { name: "r", messages: 13, roomId: "1" },
      { name: "B", messages: 13, roomId: "2" },
      { name: "C", messages: 8, roomId: "3" },
      { name: "D", messages: 0, roomId: "4" },
      { name: "E", messages: 7, roomId: "5" },
      { name: "D", messages: 0, roomId: "6" },
      { name: "E", messages: 7, roomId: "7" },
      { name: "D", messages: 0, roomId: "8" },
      { name: "E", messages: 7, roomId: "9" },
      { name: "D", messages: 0, roomId: "10" },
      { name: "E", messages: 7, roomId: "11" },
      { name: "D", messages: 0, roomId: "12" },
      { name: "E", messages: 7, roomId: "13" },
      { name: "D", messages: 0, roomId: "14" },
      { name: "E", messages: 7, roomId: "15" },
    ]);
  }, []);

  // 실시간 메시지
  useEffect(() => {
    chatSocket.on("message", getMessagesSocketHandler);

    // 이전 메시지 수신
    chatSocket.on("previousMessages", (messages: MessageType[]) => {
      setChatLog(messages);
    });

    return () => {
      chatSocket.off("message", getMessagesSocketHandler);
      chatSocket.off("previousMessages");
    };
  }, []);

  // 채팅방 선택 핸들러
  const handleRoomSelect = async (roomId: string) => {
    setSelectedRoom(roomId);

    try {
      // 이전 채팅방 나가기
      if (selectedRoom) {
        chatSocket.emit("leaveRoom", selectedRoom);
      }

      // 새로운 채팅방 입장
      chatSocket.emit("joinRoom", roomId);

      // 이전 메시지 내역 요청
      //서버에 roomId 별로 메시지 달라고 요청 보내고 챗 로그에 집어 넣기
      // const msg = axios ~~ 요청
      // setChatLog(msg);
    } catch (error) {
      console.error("채팅 내역을 불러오는데 실패했습니다:", error);
    }
  };

  // 메시지 전송 핸들러
  const submitMessageApiHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (messageRef.current?.value && selectedRoom) {
      const newMessage = {
        message: messageRef.current.value,
        timestamp: new Date().toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        user: "me",
        roomId: selectedRoom, // 선택된 방 ID 추가
      };
      chatSocket.emit("message", newMessage);
      messageRef.current.value = "";
    }
  };

  const getMessagesSocketHandler = (data: MessageType) => {
    setChatLog((prevChatLog) => [...prevChatLog, data]);
  };

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  if (!user || !user.admin) {
    return notFound({});
  }

  return (
    <div className="flex bg-white gap-2 px-10 pt-10 h-[800px]">
      <div className="w-64 border border-mainColor rounded overflow-y-auto">
        <div className="p-4 bg-white rounded border-b border-gray-300 sticky top-0">
          <h2 className="text-lg font-semibold text-gray-700">채팅</h2>
        </div>
        <div>
          {chatRooms.map((room) => (
            <div
              key={room.roomId}
              onClick={() => handleRoomSelect(room.roomId)}
              className={`p-4 hover:bg-gray-300 cursor-pointer border-b border-gray-100 
                ${selectedRoom === room.roomId ? "bg-gray-300" : ""}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">{room.name}</span>
                    <span className="text-xs text-gray-500">
                      {room.messages}일전
                    </span>
                  </div>
                  {room.lastMessage && (
                    <p className="text-sm text-gray-500 truncate">
                      {room.lastMessage}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedRoom && (
        <div className="flex-1 flex flex-col rounded border border-mainColor">
          <div ref={containerRef} className="flex-1 overflow-y-auto">
            <p className="text-center bg-white border-b border-gray-300 py-2 mb-4 sticky top-0 rounded">
              {selectedRoom &&
                chatRooms.find((room) => room.roomId === selectedRoom)?.name}
            </p>
            <div className="space-y-4 overflow-y-auto p-4">
              {chatLog.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.user === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex items-end gap-2 ${message.user === "me" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    {message.user !== "me" && (
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0" />
                    )}
                    <div className="flex flex-col gap-1">
                      <div
                        className={`max-w-md px-4 py-2 rounded-2xl 
                      ${
                        message.user === "me"
                          ? "bg-rose-200 text-gray-800"
                          : "bg-gray-200 text-gray-800"
                      }`}
                      >
                        {message.message}
                      </div>
                      {message.timestamp && (
                        <span
                          className={`text-xs text-gray-500 ${message.user === "me" ? "text-right" : "text-left"}`}
                        >
                          {message.timestamp}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-gray-300 p-4">
            <form onSubmit={submitMessageApiHandler} className="flex gap-2">
              <input
                ref={messageRef}
                type="text"
                placeholder="메시지를 입력하세요."
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-gray-400"
              />
              <button
                type="submit"
                className="px-4 py-2 text-gray-500 hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
