"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Modal from "./Modal";
import Button from "./common/Button";
import RequestModal from "./RequestModal";
import FriendAddModal from "./FriendAddModal";

import { useUserStore } from "@/app/store/userStore";
import { deleteFriend, getFriendList } from "./common/api/friendApi";

import { IoPersonCircleOutline } from "react-icons/io5";

interface Friend {
  id: string;
  name: string;
}

const AddressBookModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onAddFriend?: (friend: Friend) => void;
  isSchedulePage?: boolean;
}> = ({ isOpen, onClose, onAddFriend, isSchedulePage }) => {
  const [isRequestModalOpen, setRequestModalOpen] = useState(false);
  const [isFriendAddModalOpen, setFriendAddModalOpen] = useState(false);
  const [friends, setFriends] = useState<Friend[]>([]);
  const { user } = useUserStore();

  useEffect(() => {
    getFriendListHandler();
  }, [isOpen, isRequestModalOpen]);

  const getFriendListHandler = async () => {
    //임시 - 유저 정보 없으면 API 호출 불가
    if (!user) return;
    try {
      const friendsList = await getFriendList();
      setFriends(friendsList);
    } catch (error) {
      console.error(error);
    }
  };

  // 친구 삭제
  const handleDelete = async (friendId: string) => {
    const deleteConfirm = confirm("정말 친구 목록에서 삭제하시겠습니까?");

    if (!deleteConfirm) {
      return;
    }

    try {
      await deleteFriend(friendId.toString());
      setFriends(friends.filter((friend) => friend.id !== friendId)); // 삭제 후 친구 목록에서 제거
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirm = () => {
    setRequestModalOpen(true);
  };

  const handleAddFriend = () => {
    setFriendAddModalOpen(true);
  };

  const handleAddSchedule = (friend: Friend) => {
    if (onAddFriend) {
      onAddFriend(friend);
      onClose();
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="주소록">
        <div className="min-h-60 max-h-60 overflow-y-auto mb-4">
          {friends.length > 0 ? (
            <ul className="mb-4">
              {friends.map((friend) => (
                <li
                  key={friend.id}
                  className="flex justify-between items-center py-2 px-2 border-b border-gray-300"
                >
                  <span className="flex items-center gap-2">
                    <IoPersonCircleOutline className="text-gray-300 w-[50px] h-[50px]" />
                    {friend.name}
                  </span>
                  {isSchedulePage && (
                    <Button
                      onClick={() => handleAddSchedule(friend)} // 친구 선택 시 처리
                      style={{
                        textColor: "text-mainColor",
                        backgroundColor: "bg-transparent",
                        hoverTextColor: "hover:text-mainColorHover",
                      }}
                    >
                      추가
                    </Button>
                  )}
                  {!isSchedulePage && (
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
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-gray-500 mt-4">
              아직 친구목록이 없습니다ㅠㅠ
              <br />
              <div className="mt-8">
                함께 여행하고 싶은 친구에게 공유하거나,
                <br />
                <Link
                  href="/board/friend"
                  className="font-semibold text-mainColor"
                >
                  [친구구함 게시판]
                </Link>
                을 통해 친구를 맺어보세요!
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-center gap-2">
          <Button
            onClick={() => handleConfirm()}
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
