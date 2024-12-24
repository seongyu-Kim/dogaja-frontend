"use client";

import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  style?: {
    textColor?: string;
    textSize?: string;
    width?: string;
    height?: string;
    padding?: string;
    borderRadius?: string;
    hover?: string;
    hoverColor?: string;
    hoverTextColor?: string;
    backgroundColor?: string;
    border?: string;
    borderColor?: string;
  };
  className?: string;
}

export default function Button({
  children,
  disabled = false,
  onClick,
  style,
  className = "",
  type = "button",
}: ButtonProps) {
  const buttonStyle = `
    ${style?.textColor || "text-white"}
    ${style?.textSize || "text-base"}
    ${style?.width || "w-auto"}
    ${style?.height || "h-10"}
    ${style?.padding || "px-4 py-2"}
    ${style?.borderRadius || "rounded-md"}
    ${style?.backgroundColor || "bg-blue-500"}
    transition-all 
    duration-300 
    ease-in-out 
    focus:outline-none
    ${style?.hover ? `${style.hover}` : ""} 
    ${style?.hoverColor ? `${style.hoverColor}` : ""}
    ${style?.hoverTextColor ? `${style.hoverTextColor}` : ""}
    ${style?.border ? `${style.border}` : ""}
    ${style?.borderColor ? `${style.borderColor}` : ""}
    ${className}
  `;

  return (
    <button
      disabled={disabled}
      className={buttonStyle}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
