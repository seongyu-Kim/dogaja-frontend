import { IoDocumentText } from "react-icons/io5";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
interface ListProps {
  // 임시 타입
  list: any[];
  preview?: boolean;
  boardType?: string;
  detailList?: boolean;
  postId?: string;
}
// 추가로 라우터 주소, 받아야함
// 제목, 닉네임 일정 길이 넘어가면 잘라서 뒤에... 붙이기
// board 경로에서 각 게시물 리스트 클릭해서 해당 게시판 넘어갈 수 있게 boardType 추가
export default function List({
  list,
  preview = true,
  boardType,
  detailList = false,
  postId,
}: ListProps) {
  if (!list) {
    return null;
  }
  const searchParams = useSearchParams().get("page");
  const route = usePathname();

  return (
    <main className="w-[300px] md:w-auto">
      <ul className="flex flex-col items-center justify-center w-full">
        {/*image_id는 임시 값 추후 수정*/}
        {list.map(({ id, image_id, title, commentsCount, name }) => {
          const path = `${boardType ? `board/${boardType}/${id}?page=${searchParams}` : detailList ? `./${id}?page=${searchParams}` : `${route}/${id}?page=${searchParams}`}`;

          return (
            <Link
              href={path}
              key={id}
              className={`w-full py-2 border-b border-gray-400 hover:cursor-pointer hover:bg-gray-200 ${postId == id ? "bg-gray-200" : ""}`}
            >
              <div
                className={`w-full flex items-center justify-between ${preview ? "h-[50px]" : "h-auto"} px-1 gap-1`}
              >
                {preview && (
                  <div className="w-[50px] h-[50px] hidden md:flex items-center justify-center bg-gray-200 rounded-lg">
                    {image_id ? (
                      <p>이미지</p> //임시 - 추후 이미지 가공해서 보여주기
                    ) : (
                      <IoDocumentText className="w-[55px] h-[55px] text-gray-400" />
                    )}
                  </div>
                )}
                <div className="flex w-[85%] items-center gap-3">
                  {postId == id && (
                    <p className="font-semibold text-xl">{"→"}</p>
                  )}
                  <p>
                    {title.length > 35
                      ? `${title.slice(0, 34)}...`
                      : `${title}`}
                  </p>
                  {commentsCount > 0 && (
                    <p className="text-[10px] text-blue-700">{commentsCount}</p>
                  )}
                </div>
                {preview && (
                  <div className="hidden md:flex items-end justify-end w-[100px]">
                    <p className="overflow-hidden whitespace-nowrap text-ellipsis text-sm">
                      {name}
                    </p>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </ul>
    </main>
  );
}
