// app/board/page.tsx
import Link from "next/link";
import { BOARD_TYPES } from "@/app/utils/board-config";

const BoardListPage = () => {
  return (
    <div>
      <h1>게시판 목록</h1>
      <ul>
        {Object.keys(BOARD_TYPES).map((boardType) => (
          <li key={boardType}>
            <Link href={`/board/${boardType}`}>
              {BOARD_TYPES[boardType as keyof typeof BOARD_TYPES].title} 게시판
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BoardListPage;
