import React, { useState } from "react";
import Modal from "./Modal";
import Input from "./common/Input";

const InputModal: React.FC<{ isOpen: boolean; onClose: () => void; }> = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    console.log("입력된 값:", inputValue);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="인풋 모달">
      <Input
        type="text"
        name="inputField"
        placeholder="값을 입력하세요"
        value={inputValue}
        onChange={handleInputChange}
        required
        className="mb-4 w-full"
      />
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        제출
      </button>
    </Modal>
  );
};

export default InputModal;
