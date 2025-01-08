import React, { useEffect, useState } from "react";
import { FaListAlt } from "react-icons/fa";
import { mainApi } from "@/app/utils/mainApi";
import { API } from "@/app/utils/api";
import { ErrorAlert } from "@/app/utils/toastAlert";
import { useUserStore } from "@/app/store/userStore";

interface myPost {
  id?: string;
  title?: string;
  type?: string;
}

const MyPosts = () => {
  const [myPosts, setMyPosts] = useState<myPost[]>([]);
  const { isLogin } = useUserStore();

  // 내가 쓴 글
  const fetchMyPost = async () => {
    if (!isLogin) return;

    try {
      const res = await mainApi({
        url: API.BOARD.BOARD_MY_POST,
        method: "GET",
        withAuth: true,
      });

      setMyPosts((res.data as { posts: myPost[] }).posts);
    } catch (e) {
      ErrorAlert("나의 게시글을 불러오는데 실패하였습니다.");
    }
  };

  useEffect(() => {
    if (isLogin) {
      fetchMyPost();
    }
  }, [isLogin]);

  return (
    <div className="border-2 border-mainColor rounded-lg p-4 shadow-md h-full overflow-hidden">
      <h2 className="flex text-lg p-3 items-center">
        <FaListAlt className="w-5 h-auto mr-2" /> 내가 작성한 글
      </h2>
      <div className="p-3 h-[calc(100%-3rem)] overflow-y-auto">
        {myPosts.length > 0 ? (
          <ul>
            {myPosts.map((post) => (
              <li key={post.id} className="mb-4 border-b border-black pb-4">
                <p className="text-md">
                  {post.type === "with"
                    ? "동행"
                    : post.type === "friend"
                      ? "친구 구함"
                      : post.type === "ask"
                        ? "문의"
                        : post.type === "review"
                          ? "후기"
                          : post.type}
                </p>
                <div className="flex">
                  <p className="text-lg">제목:</p>
                  <p className="text-lg">&nbsp;{post.title}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-500 flex flex-col items-center justify-center mt-8">
            <p>아직 작성한 글이 없습니다!</p>
            <p>게시판 목록에서 다양한 소통을 해보세요!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPosts;
