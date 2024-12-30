"use client";

import React, { useState } from "react";
import KakaoMap from "../map/page";
import { TbMapSearch } from "react-icons/tb";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { LiaThumbtackSolid } from "react-icons/lia";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import Input from "@/app/components/common/Input";

interface Place {
  place_name: string;
  address_name: string;
  road_address_name?: string;
  phone?: string;
}
const Dashboard: React.FC = () => {
  //검색값
  const [searchValue, setSearchValue] = useState<string>("");
  const [locationsList] = useState<string[]>([
    "우리집",
    "서울역",
    "동대문",
    "광화문",
    "압구정",
    "홍대",
    "이태원",
  ]);
  //선택 장소
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  //추천 장소
  const [places, setPlaces] = useState<Place[]>([]);
  //
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleSearchClick = () => {
    setSearchValue(selectedLocation);
    setShowDropdown(true);
  };

  const handleLocationSelect = (location: string) => {
    setSearchValue(location);
    setSelectedLocation(location);
    setShowDropdown(false);
  };

  const filteredLocations = locationsList.filter((location) =>
    location.includes(searchValue)
  );
  const highlightMatch = (text: string, search: string) => {
    if (!search) return text;

    const regex = new RegExp(`(${search})`, "g");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      part === search ? (
        <span key={index} className="text-green-500">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div>
      {/* 검색창 */}
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
              setPlaces([]);
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
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 "
                  onClick={() => handleLocationSelect(location)}
                >
                  <div className="flex">
                    <FaMapMarkerAlt className="w-3 h-auto mr-2" />
                    {highlightMatch(location, searchValue)}
                  </div>
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">검색 결과가 없습니다.</li>
            )}
          </ul>
        )}
      </div>

      <div className="flex justify-center min-h-[calc(92vh)]">
        {/* 레이아웃 */}
        <div className="flex w-full max-w-7xl">
          {/* 왼쪽*/}
          <div className="flex flex-col flex-grow basis-2/3 p-4 space-y-4">
            {/* 지도 */}
            <div className="flex-grow bg-gray-200 rounded-lg shadow-md ">
              <h2 className="flex text-lg p-3">
                <TbMapSearch className="w-6 h-auto mr-2" />
                지도
              </h2>
              <div style={{ height: "90%" }}>
                <KakaoMap
                  keyword={selectedLocation}
                  onPlacesFetched={setPlaces}
                />
              </div>
            </div>
            {/* 추천 장소 */}
            <div className="bg-gray-200 rounded-lg shadow-md h-[30vh] overflow-hidden">
              <h2 className="flex text-lg p-3">
                <LiaThumbtackSolid className="w-6 h-auto mr-2" />
                추천 맛집
              </h2>
              <div className="flex flex-col ml-3 h-[calc(100%-3rem)] overflow-y-auto">
                {places.length > 0 ? (
                  places.map((place, index) => (
                    <div
                      key={index}
                      className="mb-4 border-b-[1px] border-black pb-4"
                    >
                      <p className="text-lg">{place.place_name}</p>
                      <p>{place.road_address_name || place.address_name}</p>
                      <p className="text-sm">
                        {place.phone || "번호를 제공하지 않습니다."}
                      </p>
                    </div>
                  ))
                ) : (
                  <div>추천 장소가 없습니다.</div>
                )}
              </div>
            </div>
          </div>

          {/* 오른쪽 */}
          <div className="flex flex-col flex-grow basis-1/3 p-4 space-y-4">
            {/* 날씨 */}
            <div className="bg-gray-200 rounded-lg shadow-md h-4/6">
              <h2 className="flex text-lg p-3">
                <TiWeatherPartlySunny className="w-6 h-auto mr-2" />
                날씨
              </h2>
              <div className="ml-3">맑음</div>
              <div className="ml-3">맑음</div>
              <div className="ml-3">맑음</div>
              <div className="ml-3">맑음</div>
              <div className="ml-3">맑음</div>
            </div>
            {/* 행사 및 축제 */}
            <div className="bg-gray-200 rounded-lg shadow-md h-3/5">
              <h2 className="flex text-lg p-3">
                <FaMapMarkerAlt className="w-5 h-auto mr-2" />
                행사 및 축제
              </h2>
              <div className="ml-3">XX 행사 진행 중</div>
              <div className="ml-3">XX 행사 진행 중</div>
              <div className="ml-3">XX 행사 진행 중</div>
              <div className="ml-3">XX 행사 진행 중</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
