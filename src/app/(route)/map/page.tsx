"use client";

import { useEffect, useState } from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";

const KakaoMap = () => {
  const [currentPosition, setCurrentPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const myPosition = { lat, lng };
          setCurrentPosition(myPosition);
          console.log(`내 위치: ${JSON.stringify(myPosition)}`);
        },
        (error) => {
          console.error("위치 가져오기 실패", error);
          const fallbackPosition = { lat: 33.5563, lng: 126.79581 };
          setCurrentPosition(fallbackPosition);
          console.log(`기본 위치: ${JSON.stringify(fallbackPosition)}`);
        }
      );
    }
  }, []);

  return (
    <Map
      center={currentPosition || { lat: 33.5563, lng: 126.79581 }}
      style={{ width: "100%", height: "100%" }}
    >
      {currentPosition && (
        <>
          <MapMarker
            position={currentPosition}
            clickable={true}
            onClick={() => setIsOpen(true)}
          />

          {isOpen && (
            <CustomOverlayMap position={currentPosition}>
              <div
                className="rounded-lg bg-white p-2 shadow-md"
                style={{
                  position: "relative",
                  bottom: "170px",
                  width: "210px",
                  borderRadius: "8px",
                }}
              >
                <div className="font-bold mb-2">내 위치</div>
                <div>지역명: 서울</div>
                <div>인구밀도: 많음</div>
                <div>날씨: 좋음</div>
                <div>미세먼지 농도: 나쁨</div>
                <div>가까운 주차장: XX공영주차장</div>
                <button
                  className="mt-2 px-4 py-1 bg-blue-500 text-white rounded"
                  onClick={() => setIsOpen(false)}
                >
                  닫기
                </button>
              </div>
            </CustomOverlayMap>
          )}
        </>
      )}
    </Map>
  );
};

export default KakaoMap;
