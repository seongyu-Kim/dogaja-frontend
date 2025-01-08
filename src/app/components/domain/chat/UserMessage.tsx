import { MessagesType } from "@/app/type/ChatType";
import SystemMessage from "@/app/components/domain/chat/SystemMessage";
import React from "react";
import { IoPersonCircleOutline } from "react-icons/io5";

type User = {
  name: string;
  email: string;
  admin: boolean;
  id: string;
} | null;

export default function UserMessage({
  chatLog,
  user,
}: {
  chatLog: MessagesType[];
  user: User;
}) {
  return (
    <>
      {chatLog.map(({ messageId, content, senderName }) => (
        <li
          key={messageId}
          className={`flex ${senderName === `${user!.name}` ? "justify-end" : "justify-start"}`}
        >
          <div className="flex flex-col w-full">
            {senderName !== "System" ? (
              <>
                <span
                  className={`${senderName === `${user!.name}` ? "hidden" : ""}`}
                >
                  {senderName}
                </span>
                <div
                  className={`flex items-end gap-2 ${senderName === `${user!.name}` ? "flex-row-reverse" : "flex-row"}`}
                >
                  {senderName !== `${user!.name}` && (
                    <IoPersonCircleOutline className="w-10 h-10 text-gray-300 flex-shrink-0" />
                  )}
                  <div className="flex flex-col gap-1">
                    <div
                      className={`max-w-md px-4 py-2 
                      ${
                        senderName === `${user!.name}`
                          ? "bg-rose-200 text-gray-800 rounded-l-lg rounded-br-lg"
                          : "bg-gray-200 text-gray-800 rounded-r-lg rounded-bl-lg"
                      }`}
                    >
                      {content}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <SystemMessage content={content} />
            )}
          </div>
        </li>
      ))}
    </>
  );
}
