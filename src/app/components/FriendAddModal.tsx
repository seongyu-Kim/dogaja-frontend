import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import Button from "./common/Button";

import { ErrorAlert } from "@/app/utils/toastAlert";
import { searchFriends, addFriend } from "./common/api/friendApi";

import { FaPlus } from "react-icons/fa";

interface Friend {
  id: string;
  nickname: string;
}

interface FriendAddModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FriendAddModal: React.FC<FriendAddModalProps> = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState("");
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // 친구 검색
  const handleSearch = async () => {
    if (!inputValue.trim()) {
      setFriends([]);
      setHasSearched(true);
      return;
    }

    setLoading(true);
    setHasSearched(true);
    
    try {
      const result = await searchFriends(inputValue.trim());
      setFriends(result);
    } catch (error) {
      console.error(error);
      ErrorAlert("친구 검색 중 오류가 발생했습니다.");
      setFriends([]);
    } finally {
      setLoading(false);
    }
  };

  // 친구 추가
  const handleAdd = async (friend: Friend) => {
    try {
      await addFriend(friend.nickname);
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setInputValue("");
    setFriends([]);
    setLoading(false);
    setHasSearched(false);
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={closeModal} 
      title="친구 추가"
      inputProps={{
        type: "text",
        name: "nickname",
        placeholder: "닉네임을 입력하세요",
        value: inputValue,
        onChange: handleInputChange,
        onKeyDown: handleKeyDown,
      }} 
      onSubmit={handleSearch}
    >
      <Button
        onClick={handleSearch}
        
        className="text-sm w-full"
        style={{
          backgroundColor: "bg-mainColor",
          hoverColor: "hover:bg-mainHover",
        }}
      >
        검색
      </Button>

      {loading && <p className="mt-4">검색 중...</p>}

      {hasSearched && !loading && friends.length === 0 && (
        <p className="mt-4 text-gray-500">검색 결과가 없습니다.</p>
      )}

      {friends.length > 0 && (
        <div className="mt-4 max-h-36 overflow-y-auto border border-gray-200 rounded">
          <ul>
            {friends.map(friend => (
              <li key={friend.id} className="flex justify-between items-center py-2 px-4 border-b border-gray-300">
                <span className="flex items-center">
                  <div className="mr-3 py-3 px-1 border rounded-lg bg-gray-300">이미지</div>
                  {friend.nickname}
                </span>
                <button
                  className="bg-mainColor text-sm hover:bg-mainHover text-white px-1.5 py-1.5 rounded"
                  onClick={() => handleAdd(friend)}
                >
                  <FaPlus />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Modal>
  );
};

export default FriendAddModal;
