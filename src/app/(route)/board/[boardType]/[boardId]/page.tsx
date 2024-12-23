import BoardDetailView from "@/app/components/domain/board/BoardDetailView";
import getBoardTitle from "@/app/utils/getBoardTitle";
interface PostIdProps {
  params: {
    boardType: string;
    boardId: string;
  };
}

export default async function FindFriendId({ params }: PostIdProps) {
  const { boardId, boardType } = params;
  const title = getBoardTitle(boardType);
  return (
    <>
      <BoardDetailView id={boardId} boardTitle={title} />
    </>
  );
}
