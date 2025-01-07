import { IoIosClose } from "react-icons/io";
import React, { useEffect, useRef, useState } from "react";
import { MessagesType, MessageType } from "@/app/type/ChatType";
import { useUserStore } from "@/app/store/userStore";
import { disconnectSocket, getSocket } from "@/app/utils/websocket";
import { Socket } from "socket.io-client";
import UserMessage from "@/app/components/domain/chat/UserMessage";

interface Props {
  adminChatClick: boolean;
  setAdminChatClick: (value: boolean) => void;
}

export default function UserChatArea({
  adminChatClick,
  setAdminChatClick,
}: Props) {
  return (
    <>
      {adminChatClick && (
        <div className="z-50 overflow-y-hidden flex gap-3 flex-col items-center group bg-white border border-gray-300 shadow-2xl fixed bottom-5 right-5 py-1 px-1 rounded-md w-[400px] h-[700px]">
          <div className="flex justify-between w-full items-center">
            <h3 className="font-semibold text-gray-700">1:1 문의</h3>
            <IoIosClose
              onClick={() => {
                setAdminChatClick(!adminChatClick);
                disconnectSocket();
              }}
              className="w-[35px] h-[35px] text-gray-500 cursor-pointer"
            />
          </div>
          <div className="flex items-center w-full h-full border-t border-gray-300">
            <ChatArea />
          </div>
        </div>
      )}
    </>
  );
}

function ChatArea() {
  const [chatLog, setChatLog] = useState<MessagesType[]>([]);
  const [roomId, setRoomId] = useState<number | null>(null);
  const messageRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);
  const { user } = useUserStore();

  useEffect(() => {
    if (!user) {
      disconnectSocket();
      return;
    }
    socketRef.current = getSocket();
    const chatSocket = socketRef.current;

    // 새 메시지 수신 처리
    chatSocket.on("message", (message: MessagesType) => {
      setChatLog((prevChatLog) => [...prevChatLog, message]);
    });

    //채팅방 입장 메시지 수신
    chatSocket.on("roomJoined", ({ roomId, messages }) => {
      setChatLog(messages);
      setRoomId(roomId);
    });

    // 채팅방 생성 또는 입장
    const initializeChat = async () => {
      chatSocket.emit("createOrJoinRoom", { id: user.id });
    };
    initializeChat();

    return () => {
      chatSocket.off("sendMessage");
      chatSocket.off("getMessagesByChatRoom");
      disconnectSocket();
    };
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [chatLog]);

  //메시지 전송
  const submitMessageHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!messageRef.current?.value || !user || !roomId) return;

    const messageContent = messageRef.current.value;

    // 새 메시지 객체 생성
    const newMessage: MessageType = {
      roomId: roomId,
      message: messageContent,
      senderName: user.name,
    };

    // 입력창 초기화
    messageRef.current.value = "";

    try {
      // 웹소켓으로 메시지 전송
      socketRef.current?.emit("sendMessage", newMessage);
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
    <div className="flex flex-col w-full h-full">
      <div
        ref={containerRef}
        className="space-y-4 px-2 py-2 overflow-y-auto pb-16 h-full"
      >
        <UserMessage chatLog={chatLog} user={user} />
      </div>
      <div className="border-t border-gray-300 p-2 sticky bottom-0 left-0 w-full bg-white">
        <form onSubmit={submitMessageHandler} className="flex gap-2 w-full">
          <input
            ref={messageRef}
            type="text"
            placeholder="메시지를 입력하세요."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-gray-400"
          />
          <button
            type="submit"
            className="py-2 text-gray-500 hover:text-gray-600"
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
  );
}
