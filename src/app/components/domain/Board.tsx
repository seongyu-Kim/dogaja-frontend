import List from "@/app/components/common/List";
import Button from "@/app/components/common/Button";

interface BoardPorps {
  name: string;
  // 임시 타입
  list: any[];
}

export default function Board({ name, list }: BoardPorps) {
  return (
    <div className="flex flex-col w-full h-[100vh] items-center gap-20">
      <p className="text-3xl">{name} 게시판</p>
      <main className="w-[50%]">
        <List list={list} />
      </main>
      <div>
        <Button
          style={{
            backgroundColor: "background-color: #3CB731",
          }}
        >
          글 작성
        </Button>
      </div>
    </div>
  );
}
