import List from "@/app/components/common/List";
import PathToCreate from "@/app/components/domain/board/PathToCreate";

interface BoardPorps {
  name: string;
  // 임시 타입
  list: any[];
}

export default function Board({ name, list }: BoardPorps) {
  return (
    <div className="flex flex-col w-[50%] h-[100vh] items-center gap-20 pt-10 px-3 bg-gray-100">
      <p className="text-3xl">{name} 게시판</p>
      <main className="w-full">
        <List list={list} />
        <div className="mt-2 flex justify-end">
          <PathToCreate />
        </div>
      </main>
    </div>
  );
}
