import React from "react";

interface InputProps {
  type: string;
  name: string;
  placeholder?: string;
  value?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  required = false,
  className = "",
}) => {
  return (
    <div className="flex flex-col">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-none ${className}`}
      />
    </div>
  );
};

export default Input;
