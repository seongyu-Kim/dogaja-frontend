"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useUserStore } from "@/app/store/userStore";
import { ChatRoom, MessagesType, MessageType } from "@/app/type/ChatType";
import { disconnectSocket, getSocket } from "@/app/utils/websocket";
import { Socket } from "socket.io-client";
import { getRoomList } from "@/app/utils/chatApi";

export default function ChatPage() {
  //임시 - 아래 타입들 API 나오기 전에 상상코딩된 부분이라 수정 예정
  const [chatLog, setChatLog] = useState<MessagesType[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  const messageRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);
  const { user } = useUserStore();

  useEffect(() => {
    socketRef.current = getSocket();
    const chatSocket = socketRef.current;

    // 새 메시지 수신 처리
    chatSocket.on("message", (message: MessagesType) => {
      setChatLog((prevChatLog) => [...prevChatLog, message]);
    });

    //해당 이벤트 응답 처리
    chatSocket.on("roomMessages", (message) => {
      // 응답 데이터를 상태에 저장
      setChatLog(message);
    });

    return () => {
      chatSocket.off("sendMessage");
      chatSocket.off("getMessagesByChatRoom");
      chatSocket.off("joinRoom"); // 임시
      disconnectSocket();
    };
  }, []);

  // 방이 변경될 때마다 스크롤을 하단으로 이동
  useEffect(() => {
    if (selectedRoom) {
      socketRef.current = getSocket();
      const chatSocket = socketRef.current;
      chatSocket.emit("joinRoom", selectedRoom);
    }
  }, [selectedRoom]);

  // 초기 채팅방 목록 가져오기
  useEffect(() => {
    const rooms = async () => {
      const room = await getRoomList();
      if (!room) return;
      setChatRooms(room);
    };
    rooms();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatLog]);

  const handleRoomSelect = async (roomId: number) => {
    const chatSocket = socketRef.current;
    if (!chatSocket) return;

    setSelectedRoom(roomId);
  };

  const submitMessageApiHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!messageRef.current?.value || !selectedRoom || !user?.name) return;

    const messageContent = messageRef.current.value;

    // 새 메시지 객체 생성
    const newMessage: MessageType = {
      roomId: selectedRoom,
      message: messageContent,
      senderName: user.name,
    };

    // 입력창 초기화
    messageRef.current.value = "";

    try {
      // 서버로 웹소켓 메시지 전송
      socketRef.current?.emit("sendMessage", newMessage);
      scrollToBottom();
    } catch (error) {
      console.error("메시지 전송 실패:", error);
    }
  };

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

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
                    <span className="font-medium text-sm">{room.roomName}</span>
                  </div>
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
                chatRooms.find((room) => room.roomId === selectedRoom)
                  ?.roomName}
            </p>
            <div className="space-y-4 overflow-y-auto p-4">
              {chatLog.map(({ messageId, content, senderName }) => (
                <div
                  key={messageId}
                  className={`flex relative ${senderName === `${user!.name}` ? "justify-end" : "justify-start"}`}
                >
                  <div className="bg-black">
                    <span className="absolute">{senderName}</span>
                    <div
                      className={`flex items-end gap-2 ${senderName === `${user!.name}` ? "flex-row-reverse" : "flex-row"}`}
                    >
                      {senderName !== `${user!.name}` && (
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0" />
                      )}
                      <div className="flex flex-col gap-1">
                        <div
                          className={`max-w-md px-4 py-2 rounded-2xl 
                      ${
                        senderName === `${user!.name}`
                          ? "bg-rose-200 text-gray-800"
                          : "bg-gray-200 text-gray-800"
                      }`}
                        >
                          {content}
                        </div>
                      </div>
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
