import React, { ChangeEventHandler } from "react";
import { IoClose } from "react-icons/io5";
import Input from "./common/Input";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  explanation?: string;
  inputProps?: {
    type: string;
    name: string;
    placeholder?: string;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  };
  onSubmit?: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  explanation,
  inputProps,
  onSubmit,
  children,
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    onClose();
  };

  const handleContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div
        className="relative bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-black"
        onClick={handleContentClick}
      >
        <button
          className="absolute top-4 right-4 text-black text-xl hover:border rounded-lg border-gray-400"
          onClick={onClose}
        >
          <IoClose />
        </button>
        <div className="flex flex-col items-center justify-center mb-4 border-b border-gray-500">
          <h2 className="text-xl font-semibold pb-2">{title}</h2>
          <p className="mb-4 text-gray-500 text-sm">{explanation}</p>
        </div>
        {inputProps && (
          <Input
            type={inputProps.type}
            name={inputProps.name}
            placeholder={inputProps.placeholder}
            value={inputProps.value}
            onChange={inputProps.onChange}
            onKeyDown={inputProps.onKeyDown}
            className="mb-4 w-full"
            required
          />
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
