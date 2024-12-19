import List from "@/app/components/common/List";

interface BoardPorps {
  name: string;
  // 임시 타입
  list: any[];
}

export default function Board({ name, list }: BoardPorps) {
  return (
    <header className="flex flex-col w-full h-[100vh] items-center gap-20">
      <p>{name} 게시판</p>
      <main className="w-[50%]">
        <List list={list} />
      </main>
    </header>
  );
}
