import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import Button from "./common/Button";

import { SuccessAlert } from "@/app/utils/toastAlert";
import { getFriendRequests, 
        acceptFriendRequest, 
        refuseFriendRequest } from "./common/api/friendApi";

import { IoPersonAddSharp } from "react-icons/io5";

interface Friend {
  id: string;
  name: string;
}

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  explanation: string;
}

const RequestModal: React.FC<RequestModalProps> = ({
  isOpen,
  onClose,
  title,
  explanation,
}) => {
  const [friends, setFriends] = useState<Friend[]>([]);

  useEffect(() => {
    if (isOpen) {
      getFriendRequestsHandler();
    }
  }, [isOpen]);

  const getFriendRequestsHandler = async () => {
    try {
      const requests = await getFriendRequests();
      setFriends(requests);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAcceptance = async (friendId: string) => {
    try {
      await acceptFriendRequest(friendId);
      SuccessAlert("친구 요청을 수락했습니다.");
      setFriends((prevFriends) =>
        prevFriends.filter((friend) => friend.id !== friendId),
      );
    } catch (e) {
      console.error(e);
    }
  };

  const handleRefusal = async (friendId: string) => {
    const deleteConfirm = confirm("친구 요청을 거절 하시겠습니까?");
    if (!deleteConfirm) {
      return;
    }
    try {
      await refuseFriendRequest(friendId);
      setFriends((prevFriends) =>
        prevFriends.filter((friend) => friend.id !== friendId),
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      explanation={explanation}
    >
      <div className="flex justify-center gap-2 mt-4 max-h-60 overflow-y-auto">
        <ul className="mb-4 w-full">
          {friends.length === 0 ? (
            <li className="text-center">요청이 없습니다.</li>
          ) : (
            friends.map((friend) => (
              <li
                key={friend.id}
                className="flex justify-between items-center py-2 border-b border-gray-300"
              >
                <span className="flex items-center gpa-2">
                  <IoPersonAddSharp className="text-gray-300 w-[40px] h-[40px] rounded-full" />
                  {friend.name}
                </span>
                <div className="flex justify-center gap-3">
                  <Button
                    onClick={() => handleAcceptance(friend.id)}
                    className="text-sm"
                    style={{
                      backgroundColor: "bg-mainColor",
                      hoverColor: "hover:bg-mainHover",
                    }}
                  >
                    수락
                  </Button>
                  <Button
                    onClick={() => handleRefusal(friend.id)}
                    className="text-sm"
                    style={{
                      backgroundColor: "bg-mainRed",
                      hoverColor: "hover:bg-mainRedHover",
                    }}
                  >
                    거절
                  </Button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </Modal>
  );
};

export default RequestModal;
