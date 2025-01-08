"use client";

import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

interface Place {
  place_name: string;
  address_name: string;
  road_address_name?: string;
  phone?: string;
  x: string;
  y: string;
}

interface KakaoMapProps {
  keyword: string;
  onPlacesFetched: (places: Place[]) => void;
}

const KakaoMap = ({ keyword, onPlacesFetched }: KakaoMapProps) => {
  const [currentPosition, setCurrentPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [selectedLocationPosition, setSelectedLocationPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setCurrentPosition({ lat, lng });
      });
    }
  }, []);

  useEffect(() => {
    if (!currentPosition || !window.kakao || !window.kakao.maps) {
      return;
    }

    const mapContainer = document.getElementById("map");
    if (!mapContainer) {
      return;
    }

    const map = new window.kakao.maps.Map(mapContainer, {
      center: new kakao.maps.LatLng(currentPosition.lat, currentPosition.lng),
      level: 5,
    });

    // 현재 위치 마커
    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(currentPosition.lat, currentPosition.lng),
      map: map,
      title: "현재 위치",
    });

    const currentLocationOverlay = new kakao.maps.CustomOverlay({
      position: marker.getPosition(),
      content: `
        <div style="
          margin-bottom: 130px;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 5px 10px;
          background-color: white;
          border-radius: 5px;
          border: 1px solid grey;
        ">
          현재 위치
        </div>
      `,
      zIndex: 1,
    });

    marker.setMap(map);
    currentLocationOverlay.setMap(map);
  }, [currentPosition]);

  useEffect(() => {
    if (!keyword.trim()) {
      return;
    }

    if (!window.kakao || !window.kakao.maps) {
      return;
    }

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(keyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK && data.length > 0) {
        const firstPlace = data[0];
        if (firstPlace.y && firstPlace.x) {
          const newPosition = {
            lat: parseFloat(firstPlace.y),
            lng: parseFloat(firstPlace.x),
          };
          setSelectedLocationPosition(newPosition);

          const mapContainer = document.getElementById("map");
          if (!mapContainer) {
            return;
          }

          const map = new window.kakao.maps.Map(mapContainer, {
            center: new kakao.maps.LatLng(newPosition.lat, newPosition.lng),
            level: 5,
          });

          // 마커 생성
          const marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(newPosition.lat, newPosition.lng),
            map: map,
            title: `${keyword} 위치`,
          });

          const customOverlay = new kakao.maps.CustomOverlay({
            position: marker.getPosition(),
            content: `
              <div style="
                margin-bottom: 130px;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 5px 10px;
                background-color: white;
                border-radius: 5px;
                border: 1px solid grey;
              ">
                ${keyword}
              </div>
            `,
            zIndex: 1,
          });

          marker.setMap(map);
          customOverlay.setMap(map);
        }
      }
    });

    // 추천 맛집 검색
    ps.keywordSearch(`${keyword} 맛집`, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        onPlacesFetched(data as Place[]);
      } else {
        console.warn("추천 맛집 검색 결과가 없습니다.");
      }
    });
  }, [keyword, onPlacesFetched]);

  return (
    <Map
      id="map"
      center={currentPosition || { lat: 37.566826, lng: 126.9786567 }}
      style={{ width: "100%", height: "100%" }}
    >
      {selectedLocationPosition && (
        <MapMarker position={selectedLocationPosition} />
      )}
      {currentPosition && !selectedLocationPosition && (
        <MapMarker position={currentPosition} />
      )}
    </Map>
  );
};

export default KakaoMap;
