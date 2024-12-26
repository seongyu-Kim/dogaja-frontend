import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import Button from "./common/Button";

import { API } from "@/app/utils/api";
import { mainApi } from "@/app/utils/mainApi";
import { SuccessAlert, ErrorAlert } from "@/app/utils/toastAlert";

interface Friend {
  id: number;
  nickname: string;
}

const FriendAddModal: React.FC<{ isOpen: boolean; onClose: () => void; }> = ({ isOpen, onClose }) => {
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

  const handleSearch = async () => {
    if (!inputValue.trim()) {
      setFriends([]);
      setHasSearched(true);
      return;
    }

    setLoading(true);
    setHasSearched(true);
    
    // 친구 검색 로직 (더미 데이터 사용)
    const dummyFriends = [
      { id: 1, nickname: "엘리스" },
      { id: 2, nickname: "김토끼" },
      { id: 3, nickname: "이토끼" },
      { id: 4, nickname: "박토끼" },
      { id: 5, nickname: "최토끼" },
    ];

    const filteredFriends = dummyFriends.filter(friend =>
      friend.nickname.includes(inputValue.trim())
    );

    setFriends(filteredFriends);
    setLoading(false);
  };

  const handleAddFriend = async (friend: Friend) => {
    const { FRIENDS_REQUEST_POST } = API.FRIENDS;
    try {
      const res = await mainApi({
        url: FRIENDS_REQUEST_POST,
        method: "POST",
        data: { friendName: friend.nickname },
      });

      if (res.status === 200) {
        SuccessAlert("친구 요청이 전송되었습니다.");
        closeModal();
      } else {
        ErrorAlert("친구 요청 전송에 실패했습니다.");
      }
    } catch (e) {
      console.error(e);
      ErrorAlert("친구 요청 전송 중 오류가 발생했습니다.");
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
                  className="bg-mainColor text-sm hover:bg-mainHover text-white px-2 py-1 rounded"
                  onClick={() => handleAddFriend(friend)}
                >
                  요청
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
