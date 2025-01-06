"use client";

import React, { useState } from "react";
import Input from "@/app/components/common/Input";
import MapWithPlaces from "@/app/components/domain/dashboard/MapAndPlaces";
import WeatherAndEvents from "@/app/components/domain/dashboard/WeatherAndEvents";
import { IoCloseSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { highlightMatch } from "@/app/utils/highlightMatch";
import locations from "@/app/assets/locations";
import { mainApi } from "@/app/utils/mainApi";
import { API } from "@/app/utils/api";
import { isAxiosError } from "axios";

interface ApiResponse {
  nameData: string;
  congestionLV: string;
  congestionMSG: string;
  weatherTime: string;
  temp: string;
  sensibleTemp: string;
  pcpMSG: string;
  UVLV: string;
  UVIndex: string;
  UVMSG: string;
  pm10: string;
  pm10MSG: string;
  pm25: string;
  pm25MSG: string;
  airMSG: string;
  events: EventData[];
}

interface WeatherData {
  nameData: string;
  congestionLV: string;
  congestionMSG: string;
  weatherTime: string;
  temp: string;
  sensibleTemp: string;
  pcpMSG: string;
  UVLV: string;
  UVIndex: string;
  UVMSG: string;
  pm10: string;
  pm10MSG: string;
  pm25: string;
  pm25MSG: string;
  airMSG: string;
}

interface EventData {
  EVENT_NM: string;
  EVENT_PERIOD: string;
  EVENT_PLACE: string;
  EVENT_X: string;
  EVENT_Y: string;
  PAY_YN: string;
  THUMBNAIL: string;
  URL: string;
  EVENT_ETC_DETAIL: string;
}

const Dashboard: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [locationsList] = useState<string[]>(
    locations.map((location) => location.name)
  );
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [eventsData, setEventsData] = useState<EventData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isWeatherLoading, setIsWeatherLoading] = useState<boolean>(false);
  const [isEventsLoading, setIsEventsLoading] = useState<boolean>(false);

  const handleSearchClick = () => {
    setSearchValue(selectedLocation);
    setShowDropdown(true);
  };

  const handleLocationSelect = async (location: string) => {
    setSearchValue(location);
    setSelectedLocation(location);
    setShowDropdown(false);

    setIsWeatherLoading(true);
    setIsEventsLoading(true);

    try {
      const res = await mainApi<ApiResponse>({
        url: `${API.SEARCH.SEARCH_RESULT}?keyword=${location}`,
        method: "GET",
      });

      if (res.status === 200 && res.data) {
        const data: ApiResponse = res.data;

        // 날씨
        const weather: WeatherData = {
          nameData: data.nameData,
          congestionLV: data.congestionLV,
          congestionMSG: data.congestionMSG,
          weatherTime: data.weatherTime,
          temp: data.temp,
          sensibleTemp: data.sensibleTemp,
          pcpMSG: data.pcpMSG,
          UVLV: data.UVLV,
          UVIndex: data.UVIndex,
          UVMSG: data.UVMSG,
          pm10: data.pm10,
          pm10MSG: data.pm10MSG,
          pm25: data.pm25,
          pm25MSG: data.pm25MSG,
          airMSG: data.airMSG,
        };
        setWeatherData(weather);
        setIsWeatherLoading(false);

        const events = data.events || [];
        setEventsData(events);
        setIsEventsLoading(false);
      }
    } catch (e) {
      if (isAxiosError(e) && e.response) {
        setError("Axios에러 발생");
      } else {
        setError("요청 처리 중 문제가 발생했습니다.");
      }
    } finally {
      setIsWeatherLoading(false);
      setIsEventsLoading(false);
    }
  };

  const filteredLocations = showDropdown
    ? locationsList.filter((location) => location.includes(searchValue))
    : [];

  return (
    <div>
      <div className="flex flex-col items-center p-3 mt-3 relative">
        <div className="flex items-center w-full max-w-md border-2 rounded-xl">
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
          <ul className="absolute top-full w-full max-w-md bg-white border rounded-lg z-10 shadow-md overflow-auto max-h-[600px]">
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
          <MapWithPlaces selectedLocation={selectedLocation} />
          <WeatherAndEvents
            weather={weatherData}
            events={eventsData}
            error={error}
            isWeatherLoading={isWeatherLoading}
            isEventsLoading={isEventsLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
