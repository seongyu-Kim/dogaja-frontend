import React, { useEffect, useState } from "react";
import { FaListAlt } from "react-icons/fa";
import { mainApi } from "@/app/utils/mainApi";
import { API } from "@/app/utils/api";
import { ErrorAlert } from "@/app/utils/toastAlert";

interface myPost {
  id?: string;
  title?: string;
  type?: string;
}

const MyPosts = () => {
  const [myPosts, setMyPosts] = useState<myPost[]>([]);

  //내가 쓴 글
  const fetchMyPost = async () => {
    try {
      const res = await mainApi({
        url: API.BOARD.BOARD_MY_POST,
        method: "GET",
        withAuth: true,
      });

      setMyPosts((res.data as { posts: myPost[] }).posts);
    } catch (e) {
      console.error(e);
      ErrorAlert("나의 게시글을 불러오는데 실패하였습니다.");
    }
  };

  useEffect(() => {
    fetchMyPost();
  }, []);

  return (
    <div className="bg-gray-200 rounded-lg shadow-md h-[45vh] overflow-hidden">
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
          <p>작성한 글이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default MyPosts;
