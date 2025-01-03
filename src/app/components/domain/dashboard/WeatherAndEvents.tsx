import React from "react";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { FaMapMarkerAlt } from "react-icons/fa";

const WeatherAndEvents = () => {
  return (
    <div className="flex flex-col flex-grow basis-1/3 p-4 space-y-4">
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
  );
};

export default WeatherAndEvents;
