import Board from "@/app/components/domain/board/Board";
import getBoardTitle from "@/app/utils/getBoardTitle";
import { BOARD_TYPES } from "@/app/utils/board-config";
import boardTypeRequest from "@/app/utils/boardTypeRequest";

type BoardType = keyof typeof BOARD_TYPES;

interface Props {
  params: {
    boardType: string;
    boardId: string;
  };
}

export default async function ListPage({ params }: Props) {
  const { boardType, boardId } = params;
  const boardTitle = getBoardTitle(boardType);
  const list = await boardTypeRequest(boardType as BoardType);
  return (
    <div className="flex justify-center">
      <Board
        name={`${boardTitle}`}
        list={list}
        detailList={true}
        postId={boardId}
      />
    </div>
  );
}
