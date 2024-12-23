import { IoDocumentText } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface ListProps {
  // 임시 타입
  list: any[];
}
// 추가로 라우터 주소, 받아야함
// 제목, 닉네임 일정 길이 넘어가면 잘라서 뒤에... 붙이기
export default function List({ list }: ListProps) {
  if (!list) {
    return null;
  }

  return (
    <main className="w-[300px] md:w-auto">
      <ul className="flex flex-col items-center justify-center w-full">
        {list.map((item) => {
          const route = usePathname();

          return (
            <Link
              href={`${route}/${item.id}`}
              key={item.id}
              className="w-full py-2 border-b border-gray-400 hover:cursor-pointer hover:bg-gray-200"
            >
              <div className="w-full flex item-center justify-between h-[50px] px-1 gap-1">
                <div className="w-[50px] h-[50px] hidden md:flex items-center justify-center bg-gray-200 rounded-lg">
                  {item.image_id ? (
                    <p>이미지</p> //임시 - 추후 이미지 가공해서 보여주기
                  ) : (
                    <IoDocumentText className="w-[55px] h-[55px] text-gray-400" />
                  )}
                </div>
                <div className="flex w-[85%] items-center gap-3">
                  <p>{item.title}</p>
                  <p className="text-[10px] text-blue-700">
                    {item.commentCount}
                  </p>
                </div>
                <div className="flex items-end justify-end w-[100px]">
                  <p>{item.name}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </ul>
    </main>
  );
}
