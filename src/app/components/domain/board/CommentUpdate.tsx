import Button from "@/app/components/common/Button";
import React from "react";

export default function CommentUpdate({
  value,
  onSubmit,
  onChange,
}: {
  value: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <form onSubmit={onSubmit}>
      <div className="h-[100px] flex gap-2">
        <textarea
          name="content"
          value={value}
          onChange={onChange}
          className="w-full h-full resize-none p-2 rounded-md border border-gray-400 focus:outline-none"
          placeholder="댓글을 입력해주세요"
        />
        <Button
          type="submit"
          style={{
            backgroundColor: "bg-mainColor",
            hoverColor: "hover:bg-mainHover",
            height: "h-full",
            width: "w-20",
            padding: "py-2",
          }}
        >
          댓글 수정
        </Button>
      </div>
    </form>
  );
}
