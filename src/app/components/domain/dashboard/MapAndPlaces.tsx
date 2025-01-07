import React, { useEffect, useState } from "react";
import KakaoMap from "./KakaoMap";
import { FaStar } from "react-icons/fa";
import { LiaThumbtackSolid } from "react-icons/lia";
import { TbMapSearch } from "react-icons/tb";
import { mainApi } from "@/app/utils/mainApi";
import { API } from "@/app/utils/api";
import { ErrorAlert, SuccessAlert } from "@/app/utils/toastAlert";
import AddPlaceModal from "../../AddPlaceModal";
import { useUserStore } from "@/app/store/userStore";
import { isAxiosError } from "axios";

interface Place {
  id?: string;
  place_name: string;
  address_name: string;
  road_address_name?: string;
  phone?: string;
  x: string;
  y: string;
  isFavorite?: boolean;
  favoriteId?: string;
}

interface Fav {
  id?: string;
  location: string;
  address?: string;
}

const MapWithPlaces = ({ selectedLocation }: { selectedLocation: string }) => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [favorites, setFavorites] = useState<Fav[]>([]);
  //모달
  const [isAddPlaceModal, setIsAddPlaceModal] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const { isLogin } = useUserStore();

  const openAddPlaceModal = (place: Place) => {
    setSelectedPlace(place);
    setIsAddPlaceModal(true);
  };

  const closeAddPlaceModal = () => {
    setSelectedPlace(null);
    setIsAddPlaceModal(false);
  };

  //즐찾 호출
  useEffect(() => {
    if (isLogin) {
      const initializeData = async () => {
        await fetchFavoritePlaces();
      };
      initializeData();
    }
  }, [isLogin]);

  //병합 호출
  useEffect(() => {
    if (places.length && favorites.length) {
      mergePlacesWithFavorites();
    }
  }, [favorites, places]);

  //즐찾 리스트
  const fetchFavoritePlaces = async () => {
    try {
      const res = await mainApi({
        url: API.BOOKMARK.BOOKMARK_ALL_GET,
        method: "GET",
        withAuth: true,
      });

      if (res.status === 200) {
        setFavorites(res.data as Fav[]);
      }
    } catch (e) {
      if (isAxiosError(e)) {
        ErrorAlert("즐겨찾기 목록을 불러오는데 실패하였습니다.");
      }
    }
  };

  //장소+즐찾 병합
  const mergePlacesWithFavorites = () => {
    let hasChanges = false;

    const updatedPlaces = places.map((place) => {
      const favorite = favorites.find(
        (fav) => fav.location === place.place_name
      );

      const updatedPlace = {
        ...place,
        isFavorite: !!favorite,
        favoriteId: favorite?.id,
      };

      if (
        updatedPlace.isFavorite !== place.isFavorite ||
        updatedPlace.favoriteId !== place.favoriteId
      ) {
        hasChanges = true;
      }

      return updatedPlace;
    });

    if (hasChanges) {
      setPlaces(updatedPlaces);
    }
  };

  //즐찾추가
  const addFavoritePlace = async (place: Place) => {
    if (!isLogin) {
      ErrorAlert("로그인 후 이용해주세요.");
      return;
    }
    try {
      const res = await mainApi({
        url: API.BOOKMARK.BOOKMARK_CREATE,
        method: "POST",
        data: {
          location: place.place_name,
          address: place.address_name,
          latitude: place.x,
          longitude: place.y,
          phone: place.phone,
        },
        withAuth: true,
      });

      if (res.status === 201) {
        SuccessAlert("즐겨찾기가 추가되었습니다.");
        await fetchFavoritePlaces();

        setPlaces((prevPlaces) =>
          prevPlaces.map((p) =>
            p.place_name === place.place_name ? { ...p, isFavorite: true } : p
          )
        );
      }
    } catch (e) {
      if (isAxiosError(e)) {
        if (e.status === 400) {
          ErrorAlert("이미 즐겨찾기된 장소입니다.");
        } else {
          ErrorAlert("즐겨찾기 실패");
        }
      }
    }
  };

  //즐찾해제
  const removeFavoritePlace = async (place: Place) => {
    if (!place.favoriteId) return;

    try {
      const res = await mainApi({
        url: API.BOOKMARK.BOOKMARK_DELETE(place.favoriteId),
        method: "DELETE",
        withAuth: true,
      });

      if (res.status === 200) {
        SuccessAlert("즐겨찾기가 삭제되었습니다.");
        await fetchFavoritePlaces();

        setPlaces((prevPlaces) =>
          prevPlaces.map((p) =>
            p.place_name === place.place_name ? { ...p, isFavorite: false } : p
          )
        );
      }
    } catch (e) {
      ErrorAlert("즐겨찾기 해제 실패");
    }
  };
  return (
    <div className="flex flex-col flex-grow basis-2/3 p-4 space-y-4">
      <div className="flex-grow bg-gray-200 rounded-lg shadow-md">
        <div className="flex text-lg p-3">
          <div className="flex items-center">
            <TbMapSearch className="w-6 h-auto mr-2" />
            지도
          </div>
        </div>
        <div style={{ height: "90%" }}>
          <KakaoMap keyword={selectedLocation} onPlacesFetched={setPlaces} />
        </div>
      </div>
      <div className="bg-gray-200 rounded-lg shadow-md h-[35vh] overflow-hidden">
        <div className="flex text-lg p-3">
          <LiaThumbtackSolid className="w-6 h-auto mr-2" />
          추천 맛집
        </div>
        <div className="flex flex-col ml-3 h-[calc(100%-3rem)] overflow-y-auto">
          {places.length > 0 ? (
            places.map((place, index) => (
              <div
                key={index}
                className="mb-4 border-b-[1px] border-gray-400 pb-4 flex justify-between items-center"
              >
                <div>
                  <p className="text-lg">{place.place_name}</p>
                  <p>{place.road_address_name || place.address_name}</p>
                  <p className="text-sm">
                    {place.phone || "번호를 제공하지 않는 장소입니다."}
                  </p>
                </div>

                <div className="flex mr-3 space-x-4">
                  <div
                    onClick={() => {
                      if (isLogin) {
                        openAddPlaceModal(place);
                      } else {
                        ErrorAlert("로그인 후 이용해주세요");
                      }
                    }}
                    className="cursor-pointer hover:text-green-500"
                  >
                    + 일정에 추가하기
                  </div>

                  <FaStar
                    className={`cursor-pointer w-6 h-auto  ${place.isFavorite ? "text-yellow-500" : "text-gray-400"}`}
                    onClick={() =>
                      place.isFavorite
                        ? removeFavoritePlace(place)
                        : addFavoritePlace(place)
                    }
                  />
                </div>
              </div>
            ))
          ) : (
            <div>추천 장소가 없습니다.</div>
          )}
        </div>
      </div>
      <AddPlaceModal
        isOpen={isAddPlaceModal}
        onClose={closeAddPlaceModal}
        selectedPlace={selectedPlace}
      />
    </div>
  );
};

export default MapWithPlaces;
