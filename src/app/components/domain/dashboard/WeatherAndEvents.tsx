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
      <div className="bg-gray-200 rounded-lg shadow-md h-[45vh] overflow-hidden">
        <h2 className="flex text-lg p-3">
          <TiWeatherPartlySunny className="w-6 h-auto mr-2" />
          날씨
        </h2>
        <div className="p-4">
          {isWeatherLoading ? (
            <p className="text-gray-500">날씨 데이터를 불러오는 중...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : weather ? (
            <div className="space-y-4">
              <div>
                <p>지역: {weather.nameData}</p>
                <p>혼잡도 레벨: {weather.congestionLV}</p>
                <p>혼잡도 메시지: {weather.congestionMSG}</p>
              </div>

              <div>
                <p>온도: {weather.temp}°C</p>
                <p>체감 온도: {weather.sensibleTemp}°C</p>
                <p>강수 상태: {weather.pcpMSG}</p>
              </div>

              <div>
                <p>자외선 지수: {weather.UVIndex}</p>
                <p>자외선 메시지: {weather.UVMSG}</p>
              </div>

              <div>
                <p>미세먼지 상태: {weather.pm10MSG}</p>
                <p>초미세먼지 상태: {weather.pm25MSG}</p>
                <p>공기질 메시지: {weather.airMSG}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">날씨 정보가 없습니다.</p>
          )}
        </div>
      </div>

      {/* 행사 및 축제 섹션 */}
      <div className="bg-gray-200 rounded-lg shadow-md h-[45vh] overflow-hidden">
        <h2 className="flex text-lg p-3">
          <FaMapMarkerAlt className="w-5 h-auto mr-2" />
          행사 및 축제
        </h2>
        <div className="p-4 h-[calc(100%-3rem)] overflow-y-auto">
          {isEventsLoading ? (
            <p className="text-gray-500">행사 데이터를 불러오는 중...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : events.length > 0 ? (
            <div className="space-y-2">
              {events.map((event, index) => (
                <div
                  key={index}
                  className="p-2 border-b border-gray-300 last:border-none"
                >
                  <h3 className="font-semibold">{event.EVENT_NM}</h3>
                  <p>기간: {event.EVENT_PERIOD}</p>
                  <p>장소: {event.EVENT_PLACE}</p>
                  <a
                    href={event.URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
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
