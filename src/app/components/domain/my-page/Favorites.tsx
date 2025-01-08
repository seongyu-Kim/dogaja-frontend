import React, { useEffect, useState } from "react";
import { FaBookmark, FaStar } from "react-icons/fa";
import { mainApi } from "@/app/utils/mainApi";
import { API } from "@/app/utils/api";
import { ErrorAlert, SuccessAlert } from "@/app/utils/toastAlert";
import { useUserStore } from "@/app/store/userStore";

interface Fav {
  id?: string;
  location: string;
  address?: string;
  phone?: string;
  isFav?: boolean;
}
const Favorites = () => {
  const [favorites, setFavorites] = useState<Fav[]>([]);
  const { isLogin } = useUserStore();

  useEffect(() => {
    if (isLogin) {
      fetchFavoritePlaces();
    }
  }, [isLogin]);

  //즐찾 리스트
  const fetchFavoritePlaces = async () => {
    try {
      const res = await mainApi({
        url: API.BOOKMARK.BOOKMARK_ALL_GET,
        method: "GET",
        withAuth: true,
      });

      if (res.status === 200) {
        setFavorites(
          (res.data as Fav[]).map((fav) => ({ ...fav, isFav: true }))
        );
      }
    } catch (e) {
      if (isLogin) {
        ErrorAlert("즐겨찾기 목록을 불러오는데 실패하였습니다.");
      }
    }
  };

  //즐찾 해제
  const removeFavoritePlace = async (favId: string) => {
    if (!favId) return;

    try {
      const res = await mainApi({
        url: API.BOOKMARK.BOOKMARK_DELETE(favId),
        method: "DELETE",
        withAuth: true,
      });

      if (res.status === 200) {
        SuccessAlert("즐겨찾기가 삭제되었습니다.");
        await fetchFavoritePlaces();
      }
    } catch (e) {
      ErrorAlert("즐겨찾기 삭제하는데 실패하였습니다.");
    }
  };

  return (
    <div className="border-2 border-mainColor bg-gray-100 rounded-lg shadow-md h-[45vh] overflow-hidden">
      <h2 className="flex text-lg p-3 items-center">
        <FaBookmark className="w-5 h-auto mr-2" /> 즐겨찾기
      </h2>
      <div className="p-3 h-[calc(100%-3rem)] overflow-y-auto">
        {favorites.length > 0 ? (
          <ul>
            {favorites.map((fav) => (
              <li
                key={fav.id}
                className="mb-4 border-b border-black flex justify-between items-center pb-4"
              >
                <div>
                  <h3 className="text-lg">{fav.location}</h3>
                  <p>{fav.address}</p>
                  <p className="text-sm">
                    {fav.phone || "번호를 제공하지 않는 장소입니다."}
                  </p>
                </div>
                <div className="mr-2">
                  <FaStar
                    className={`cursor-pointer w-6 h-auto ${fav.isFav ? "text-yellow-500" : ""}`}
                    onClick={() => removeFavoritePlace(fav.id!)}
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>즐겨찾기한 글이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
