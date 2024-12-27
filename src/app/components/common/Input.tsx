import React, { forwardRef } from "react";

interface InputProps {
  type: string;
  name: string;
  placeholder?: string;
  value?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  required?: boolean;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      name,
      placeholder,
      value,
      onChange,
      onClick,
      onKeyDown,
      onBlur,
      required = false,
      className = "",
    },
    ref
  ) => {
    return (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        ref={ref}
        required={required}
        className={`p-1 border border-gray-300 rounded-lg focus:outline-none ${className}`}
      />
    );
  }
);
Input.displayName = "Input";

export default Input;
