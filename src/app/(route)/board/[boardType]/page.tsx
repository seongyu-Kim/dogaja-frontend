import getBoardTitle from "@/app/utils/getBoardTitle";
import Board from "@/app/components/domain/board/Board";
import boardTypeRequest from "@/app/utils/boardTypeRequest";
import { BOARD_TYPES } from "@/app/utils/board-config";
import { Metadata } from "next";

type BoardType = keyof typeof BOARD_TYPES;

interface Props {
  params: {
    boardType: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { boardType } = params;
  const board = getBoardTitle(boardType);

  return {
    title: `${board} 게시판`,
    description: `${board} 게시판 Do가자 여행 커뮤니티 여행 플래너`,
  };
}

export default async function BoardListDetail({ params }: Props) {
  const { boardType } = params;
  const boardTitle = getBoardTitle(boardType);
  const list = await boardTypeRequest(boardType as BoardType);

  return (
    <div className="flex justify-center h-full">
      <Board name={boardTitle} list={list} />
    </div>
  );
}
