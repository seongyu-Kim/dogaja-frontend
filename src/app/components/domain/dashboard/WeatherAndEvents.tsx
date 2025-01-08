"use client";

import React from "react";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { FaMapMarkerAlt } from "react-icons/fa";

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

interface WeatherAndEventsProps {
  weather: WeatherData | null;
  events: EventData[];
  error: string | null;
  isWeatherLoading: boolean;
  isEventsLoading: boolean;
}

const WeatherAndEvents: React.FC<WeatherAndEventsProps> = ({
  weather,
  events,
  error,
  isWeatherLoading,
  isEventsLoading,
}) => {
  return (
    <div className="flex flex-col flex-grow basis-1/3 p-4 space-y-4">
      {/* 날씨 섹션 */}
      <div className="border-2 border-mainColor bg-gray-100 p-4 rounded-lg shadow-md h-[45vh] min-w-72 overflow-hidden">
        <h2 className="flex text-xl pb-3">
          <TiWeatherPartlySunny className="w-6 h-auto mr-2" />
          <p className="text-mainColor">{weather?.nameData}</p>의 날씨
        </h2>
        <div className="h-[calc(100%-2.5rem)] overflow-y-auto">
          {isWeatherLoading ? (
            <p className="text-gray-500">날씨 데이터를 불러오는 중...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : weather ? (
            <div className="space-y-2">
              <div className="border-b-2 pb-2">
                <div className="flex items-center mb-2 justify-between">
                  <p className="text-mainColor py-1">혼잡도 레벨</p> 
                  <span className="border-2 border-mainColor bg-mainColor bg-opacity-10 text-mainColor text-xs rounded-full p-1 mr-4">
                    {weather.congestionLV}
                  </span>
                </div>
                <p>{weather.congestionMSG}</p> 
              </div>

              <div className="border-b-2 pb-2">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-mainColor py-1">온도</p>
                  <span className="border-2 border-mainColor bg-mainColor bg-opacity-10 text-mainColor text-xs rounded-full p-1 mr-4">
                    {weather.temp}°C
                  </span>
                  <p className="text-mainColor py-1">체감 온도</p>
                  <span className="border-2 border-mainColor bg-mainColor bg-opacity-10 text-mainColor text-xs rounded-full p-1 mr-4">
                    {weather.sensibleTemp}°C
                  </span>
                </div>
                <p>{weather.pcpMSG}</p>
              </div>

              <div className="border-b-2 pb-2">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-mainColor py-1">자외선 지수</p>
                  <span className="border-2 border-mainColor bg-mainColor bg-opacity-10 text-mainColor text-xs rounded-full p-1 mr-4">
                    {weather.UVIndex}
                  </span>
                </div>
                <p>{weather.UVMSG}</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-mainColor py-1">미세먼지</p>
                  <span className="border-2 border-mainColor bg-mainColor bg-opacity-10 text-mainColor text-xs rounded-full p-1 mr-4">
                    {weather.pm10MSG}
                  </span>
                  <p className="text-mainColor py-1">초미세먼지</p>
                  <span className="border-2 border-mainColor bg-mainColor bg-opacity-10 text-mainColor text-xs rounded-full p-1 mr-4">
                    {weather.pm25MSG}
                  </span>
                </div>
                <p>{weather.airMSG}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">날씨 정보가 없습니다.</p>
          )}
        </div>
      </div>

      {/* 행사 및 축제 섹션 */}
      <div className="border-2 border-mainColor bg-gray-100 rounded-lg shadow-md h-[45vh] overflow-hidden">
        <h2 className="flex text-lg p-3">
          <FaMapMarkerAlt className="w-5 h-auto mr-2" />
          주변 행사 및 축제
        </h2>
        <div className="mx-4 h-[calc(100%-4rem)] overflow-y-auto">
          {isEventsLoading ? (
            <p className="text-gray-500">행사 데이터를 불러오는 중...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : events.length > 0 ? (
            <div className="space-y-2">
              {events.map((event, index) => (
                <div
                  key={index}
                  className="p-2 border-b-2 border-gray-300 last:border-none"
                >
                  <h3 className="font-semibold text-mainColor">{event.EVENT_NM}</h3>
                  <p>기간: {event.EVENT_PERIOD}</p>
                  <p>장소: {event.EVENT_PLACE}</p>
                  <a
                    href={event.URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 underline flex justify-end"
                  >
                    자세히 보기
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">진행 중인 행사가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherAndEvents;
