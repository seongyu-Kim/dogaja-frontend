import { IoIosClose } from "react-icons/io";
import { io, Socket } from "socket.io-client";
import React, { useEffect, useRef, useState } from "react";
import { MessageType } from "@/app/type/ChatType";

interface Props {
  adminChatClick: boolean;
  setAdminChatClick: (value: boolean) => void;
}

const chatSocket: Socket = io(`${process.env.NEXT_PUBLIC_SOKET_URL}`);

export default function UserChatArea({
  adminChatClick,
  setAdminChatClick,
}: Props) {
  chatSocket.connect();
  return (
    <>
      {adminChatClick && (
        <div className="flex gap-3 flex-col items-center group bg-white border border-gray-300 shadow-2xl fixed bottom-5 right-5 py-1 px-1 rounded-md w-[400px] h-[700px]">
          <div className="flex justify-end w-full">
            <IoIosClose
              onClick={() => {
                setAdminChatClick(!adminChatClick);
                chatSocket.disconnect();
              }}
              className="w-[35px] h-[35px] text-gray-500 cursor-pointer"
            />
          </div>
          <div className="flex items-center w-full h-full overflow-y-auto">
            <ChatInput />
          </div>
        </div>
      )}
    </>
  );
}

function ChatInput() {
  const [chatLog, setChatLog] = useState<MessageType[]>([
    {
      message: "더미데이터~1",
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
      message: "더미데이터~2",
      timestamp: "오후 2:30",
      user: "me",
    },
    {
      message: "더미데이터~3",
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
  const messageRef = useRef<HTMLInputElement>(null);

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

  const submitMessageApiHandler = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    if (messageRef.current?.value) {
      const newMessage = {
        message: messageRef.current.value,
        timestamp: new Date().toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        user: "me",
        roomId: null, // 방을 선택하지 않음
      };
      chatSocket.emit("message", newMessage); // 관리자에게 전송
      messageRef.current.value = "";
    }
  };

  const getMessagesSocketHandler = (data: MessageType) => {
    setChatLog((prevChatLog) => [...prevChatLog, data]);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="space-y-4 px-2 py-2">
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
      <div className="border-t border-gray-300 p-4 w-full sticky left-0 bottom-0 bg-white">
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
  );
}
