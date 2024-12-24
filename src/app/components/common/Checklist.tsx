// app/components/common/Checklist.tsx
import React from 'react';
import { FaRegSquareCheck } from "react-icons/fa6";
import { MdAddCircleOutline } from 'react-icons/md';
import { IoCloseCircleOutline } from 'react-icons/io5';
import Input from './Input';

interface ChecklistItem {
  text: string;
  checked: boolean;
}

interface ChecklistProps {
  title: string;
  checklist: ChecklistItem[];
  newChecklistItem: string;
  setNewChecklistItem: (item: string) => void;
  addChecklistItem: () => void;
  toggleCheckbox: (index: number) => void;
  removeChecklistItem: (index: number) => void;
}

const Checklist: React.FC<ChecklistProps> = ({
  title,
  checklist,
  newChecklistItem,
  setNewChecklistItem,
  addChecklistItem,
  toggleCheckbox,
  removeChecklistItem,
}) => {
  return (
    <div className="border rounded-lg border-mainColor p-4 w-full min-h-72 max-h-72">
      <div className="flex items-center mb-2">
        <FaRegSquareCheck className="text-mainColor text-lg mr-1" />
        <h2 className="font-bold">{title}</h2>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Input
          type="text"
          name="checklistItem"
          placeholder="목록을 추가해주세요"
          value={newChecklistItem}
          onChange={(e) => setNewChecklistItem(e.target.value)}
          className="w-full border rounded px-3 py-1.5"
        />
        <button onClick={addChecklistItem} className="px-1 py-1">
          <MdAddCircleOutline className="text-mainColor text-lg" />
        </button>
      </div>
      <ul className="mt-2 px-2 space-y-1 max-h-44 overflow-y-auto overflow-x-hidden">
        {checklist.map((item, index) => (
          <li key={index} className="flex items-center justify-between border-b">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleCheckbox(index)}
                className="mr-2"
              />
              <span className={item.checked ? 'line-through text-gray-400' : ''}>
                {item.text}
              </span>
            </label>
            <button onClick={() => removeChecklistItem(index)} className="hover:scale-110">
              <IoCloseCircleOutline className="text-mainRed text-lg mx-1" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Checklist;
