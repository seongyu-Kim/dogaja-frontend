"use client";

import React, { useState } from "react";
import { CheckListItem, BucketListItem } from "@/app/type/scheduleDetailType";
import { updateCheckStatus } from "./updateCheckStatus";

interface ListProps {
  scheduleId: string;
  items: (CheckListItem | BucketListItem)[];
  type: "check" | "bucket";
}

const List: React.FC<ListProps> = ({ scheduleId, items, type }) => {
  const [list, setList] = useState(items);

  const handleCheck = async (itemId: number) => {
    try {
      await updateCheckStatus(scheduleId, String(itemId));
      setList((prevList) =>
        prevList.map((item) =>
          item.id === itemId ? { ...item, checked: !item.checked } : item
        )
      );
    } catch (error) {
      console.error("Error updating check status:", error);
    }
  };

  return (
    <div className="border-2 w-full border-mainColor rounded-lg">
      <h2 className="text-lg py-2 px-4 border-b-2 border-mainColor border-dashed bg-mainColor bg-opacity-25">
        {type === "check" ? "준비물 체크리스트" : "이번 여행 버킷리스트"}
      </h2>
      <ul>
        {list.map((item) => (
          <li key={item.id} className="flex items-center gap-4 p-2">
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => handleCheck(item.id)}
            />
            <span
              className={`${
                item.checked ? "line-through text-gray-500" : "text-black"
              }`}
            >
              {item.content}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
