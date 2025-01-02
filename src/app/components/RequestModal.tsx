import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import Button from "./common/Button";

import { API } from "@/app/utils/api";
import { mainApi } from "@/app/utils/mainApi";
import { SuccessAlert, ErrorAlert } from "@/app/utils/toastAlert";

interface Friend {
  id: number;
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
      getFriendRequests();
    }
  }, [isOpen]);

  const getFriendRequests = async () => {
    const { FRIENDS_REQUEST_GET } = API.FRIENDS;
    try {
      const res = await mainApi({
        url: FRIENDS_REQUEST_GET,
        method: "GET",
        withAuth: true,
      });
      if (res.status === 200) {
        setFriends(res.data as Friend[]);
      }
    } catch (e) {
      console.error(e);
      ErrorAlert("친구요청 가져오기에 실패했습니다.");
    }
  };

  const handleAcceptance = async (id: number) => {
    const { FRIENDS_REQUEST_PATCH } = API.FRIENDS;
    try {
      const res = await mainApi({
        url: FRIENDS_REQUEST_PATCH(id),
        method: "PATCH",
        data: { status: "accepted" },
        withAuth: true,
      });
      if (res.status === 200) {
        SuccessAlert("친구 요청을 수락했습니다.");
        setFriends((prevFriends) =>
          prevFriends.filter((friend) => friend.id !== id),
        );
      }
    } catch (e) {
      console.error(e);
      ErrorAlert("친구요청 수락에 실패했습니다.");
    }
  };

  const handleRefusal = async (id: number) => {
    const deleteConfirm = confirm("친구 요청을 거절 하시겠습니까?");
    if (!deleteConfirm) {
      return;
    }
    const { FRIENDS_REQUEST_PATCH } = API.FRIENDS;
    try {
      const res = await mainApi({
        url: FRIENDS_REQUEST_PATCH(id),
        method: "PATCH",
        data: { status: "rejected" },
        withAuth: true,
      });
      if (res.status === 200) {
        setFriends((prevFriends) =>
          prevFriends.filter((friend) => friend.id !== id),
        );
      }
    } catch (e) {
      console.error(e);
      ErrorAlert("친구요청 거절에 실패했습니다.");
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
                <span className="flex items-center">
                  <div className="mr-3 py-3 px-1 border rounded-lg bg-gray-300">
                    이미지
                  </div>
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
