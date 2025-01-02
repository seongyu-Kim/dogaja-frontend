"use client";

import React, { useState } from "react";
import Input from "@/app/components/common/Input";
import AddPlaceModal from "@/app/components/AddPlaceModal";
import MapWithPlaces from "@/app/components/domain/dashboard/MapAndPlaces";
import WeatherAndEvents from "@/app/components/domain/dashboard/WeatherAndEvents";
import { IoCloseSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { highlightMatch } from "@/app/utils/highlightMatch";

const Dashboard: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [locationsList] = useState<string[]>([
    "서울역",
    "동대문",
    "광화문",
    "압구정",
    "홍대",
    "이태원",
  ]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [isAddPlaceModal, setIsAddPlaceModal] = useState(false);

  //모달
  const handleAddPlaceModal = () => setIsAddPlaceModal((prev) => !prev);

  //검색창 클릭
  const handleSearchClick = () => {
    setSearchValue(selectedLocation);
    setShowDropdown(true);
  };

  //장소 선택
  const handleLocationSelect = (location: string) => {
    setSearchValue(location);
    setSelectedLocation(location);
    setShowDropdown(false);
  };

  //검색어 포함
  const filteredLocations = showDropdown
    ? locationsList.filter((location) => location.includes(searchValue))
    : [];

  return (
    <div>
      <div className="flex flex-col items-center p-3 mt-3 relative">
        <div className="flex items-center w-full max-w-md border-2  rounded-xl">
          <FaSearch className="w-6 h-auto ml-3" />
          <Input
            type="text"
            name="search"
            placeholder="서울의 명소를 검색해보세요."
            value={searchValue}
            onClick={handleSearchClick}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setShowDropdown(true);
            }}
            className="w-full px-2 py-3 border-none"
          />
          <button
            onClick={() => {
              setSearchValue("");
              setSelectedLocation("");
              setShowDropdown(false);
            }}
          >
            <IoCloseSharp className="w-8 h-auto mr-2" />
          </button>
        </div>

        {showDropdown && (
          <ul className="absolute top-full w-full max-w-md bg-white border rounded-lg z-10 shadow-md">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((location, index) => (
                <li
                  key={index}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleLocationSelect(location)}
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

      <div className="flex justify-center min-h-[calc(92vh)]">
        <div className="flex w-full max-w-7xl">
          <MapWithPlaces
            selectedLocation={selectedLocation}
            handleAddPlaceModal={handleAddPlaceModal}
          />
          <WeatherAndEvents />
        </div>
      </div>

      <AddPlaceModal isOpen={isAddPlaceModal} onClose={handleAddPlaceModal} />
    </div>
  );
};

export default Dashboard;
