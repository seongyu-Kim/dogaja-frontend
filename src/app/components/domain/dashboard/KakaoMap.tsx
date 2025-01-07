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
    if (!keyword.trim()) {
      console.warn("검색어가 비어 있습니다.");
      return;
    }

    if (!window.kakao || !window.kakao.maps) {
      console.error("카카오 맵 API가 로드되지 않았습니다.");
      return;
    }

    const ps = new kakao.maps.services.Places();

    // 검색된 위치에 마커 추가
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
            console.error("맵 컨테이너를 찾을 수 없습니다.");
            return;
          }

          const map = new window.kakao.maps.Map(mapContainer, {
            center: new kakao.maps.LatLng(newPosition.lat, newPosition.lng),
            level: 5,
          });

          const marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(newPosition.lat, newPosition.lng),
            map: map,
            title: `${keyword} 위치`,
          });

          const infowindow = new kakao.maps.InfoWindow({
            content: `<div style="text-align: center; font-size: 14px;">${keyword}</div>`,
          });
          infowindow.open(map, marker);
        }
      } else {
        console.warn("검색 결과가 없습니다.");
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
        <MapMarker position={currentPosition}>
          <div>현재 위치</div>
        </MapMarker>
      )}
    </Map>
  );
};

export default KakaoMap;
