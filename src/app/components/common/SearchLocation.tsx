"use client";

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import Input from "@/app/components/common/Input";
import locations from "@/app/assets/locations";
import { highlightMatch } from "@/app/utils/highlightMatch";

interface SearchLocationProps {
  onSelect: (location: string) => void; // 선택한 장소를 부모에게 전달하는 콜백
}

const SearchLocation: React.FC<SearchLocationProps> = ({ onSelect }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const filteredLocations = showDropdown
    ? locations.map((loc) => loc.name).filter((location) => location.includes(searchValue))
    : [];

  const handleSelect = (location: string) => {
    setSearchValue(location); // 선택된 장소로 검색어 갱신
    setShowDropdown(false); // 드롭다운 닫기
    onSelect(location); // 부모 컴포넌트에 선택된 장소 전달
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="flex items-center w-full border-2 rounded-xl">
        <FaSearch className="w-6 h-auto ml-3" />
        <Input
          type="text"
          name="search"
          placeholder="서울의 명소를 검색해보세요."
          value={searchValue}
          onClick={() => setShowDropdown(true)}
          onChange={(e) => {
            setSearchValue(e.target.value);
            setShowDropdown(true);
          }}
          className="w-full px-2 py-3 border-none"
        />
        <button
          onClick={() => {
            setSearchValue("");
            setShowDropdown(false);
          }}
        >
          <IoCloseSharp className="w-8 h-auto mr-2" />
        </button>
      </div>

      {showDropdown && (
        <ul className="absolute top-full w-full bg-white border rounded-lg shadow-md z-10 overflow-auto max-h-[300px]">
          {filteredLocations.length > 0 ? (
            filteredLocations.map((location, index) => (
              <li
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelect(location)}
              >
                {highlightMatch(location, searchValue)}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">검색 결과가 없습니다.</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchLocation;
