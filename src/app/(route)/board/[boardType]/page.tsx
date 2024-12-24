import getBoardTitle from "@/app/utils/getBoardTitle";
import Board from "@/app/components/domain/board/Board";
import boardTypeRequest from "@/app/utils/boardTypeRequest";
import { BOARD_TYPES } from "@/app/utils/board-config";
import { ErrorAlert } from "@/app/utils/toastAlert";

type BoardType = keyof typeof BOARD_TYPES;

interface Props {
  params: {
    boardType: string;
  };
}

export default async function BoardListDetail({ params }: Props) {
  const { boardType } = params;
  const boardTitle = getBoardTitle(boardType);
  const list = await boardTypeRequest(boardType as BoardType);
  return (
    <div className="flex justify-center">
      <Board name={`${boardTitle}`} list={list} />
    </div>
  );
}
