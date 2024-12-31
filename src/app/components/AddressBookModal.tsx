'use client';

import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import Button from "./common/Button";
import RequestModal from "./RequestModal";
import FriendAddModal from "./FriendAddModal";

import { API } from "@/app/utils/api";
import { mainApi } from "@/app/utils/mainApi";
import { SuccessAlert, ErrorAlert } from "@/app/utils/toastAlert";

interface Friend {
  id: number;
  name: string;
}

const AddressBookModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onAddFriend: (friendName: string) => void;
  isSchedulePage?: boolean;
}> = ({ isOpen, onClose, onAddFriend, isSchedulePage }) => {
  const [isRequestModalOpen, setRequestModalOpen] = useState(false);
  const [selectedFriendId, setSelectedFriendId] = useState<number | null>(null);
  const [isFriendAddModalOpen, setFriendAddModalOpen] = useState(false);
  const [friends, setFriends] = useState<Friend[]>([]);

  useEffect(() => {
    getFriendList();
  }, []);
  
  const getFriendList = async () => {
    const { FRIENDS_LIST_GET } = API.FRIENDS;
    try {
      const res = await mainApi({
        url: FRIENDS_LIST_GET,
        method: "GET",
      });
      if (res.status === 200) {
        setFriends(res.data.friends || []);
      }
    } catch (e) {
      console.error(e);
      ErrorAlert("친구목록 가져오기에 실패했습니다.");
    }
  };

  const handleDelete = async (id: number) => {
    const { FRIENDS_DELETE } = API.FRIENDS;
    try {
      const res = await mainApi({
        url: FRIENDS_DELETE(id.toString()),
        method: "DELETE",
      });
      if (res.status === 200) {
        setFriends((prevFriends) => prevFriends.filter((friend) => friend.id !== id));
        SuccessAlert("친구 목록에서 삭제되었습니다.");
      }
    } catch (e) {
      console.error(e);
      ErrorAlert("친구 삭제에 실패했습니다.");
    }
  };

  const handleConfirm = (id: number) => {
    setSelectedFriendId(id);
    setRequestModalOpen(true);
  };

  const handleAddFriend = () => {
    setFriendAddModalOpen(true);
  };

  const handleAddSchedule = (friendName: string) => {
    onAddFriend(friendName);
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="주소록">
        <div className="max-h-60 overflow-y-auto mb-4">
          <ul className="mb-4">
            {friends.map((friend) => (
              <li
                key={friend.id}
                className="flex justify-between items-center py-2 border-b border-gray-300"
              >
                <span className="flex items-center">
                  <div className="mr-3 py-3 px-1 border rounded-lg bg-gray-300">이미지</div>
                  {friend.name}
                </span>
                {isSchedulePage && (
                  <Button
                    onClick={() => handleAddSchedule(friend.name)} // 친구 선택 시 처리
                    style={{
                      textColor: "text-mainColor",
                      backgroundColor: "bg-transparent",
                      hoverTextColor: "hover:text-mainColorHover",
                    }}
                  >
                    추가
                  </Button>
                )}
                <Button
                  onClick={() => handleDelete(friend.id)}
                  style={{
                    textColor: "text-mainRed",
                    backgroundColor: "bg-transparent",
                    hoverTextColor: "hover:text-mainRedHover",
                  }}
                >
                  삭제
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center gap-2">
          <Button
            onClick={() => handleConfirm(1)}
            className="text-sm w-full"
            style={{
              backgroundColor: "bg-mainColor",
              hoverColor: "hover:bg-mainHover",
            }}
          >
            요청 확인
          </Button>
          <Button
            onClick={handleAddFriend}
            className="text-sm w-full"
            style={{
              backgroundColor: "bg-mainColor",
              hoverColor: "hover:bg-mainHover",
            }}
          >
            친구 추가
          </Button>
        </div>
      </Modal>
      {isRequestModalOpen && (
        <RequestModal
          isOpen={isRequestModalOpen}
          onClose={() => setRequestModalOpen(false)}
          title="친구 요청"
          explanation="친구 요청에 수락하시겠습니까?"
          userId={selectedFriendId}
        />
      )}
      <FriendAddModal
        isOpen={isFriendAddModalOpen}
        onClose={() => setFriendAddModalOpen(false)}
      />
    </>
  );
};

export default AddressBookModal;
