import BoardDetailView from "@/app/components/domain/board/BoardDetailView";
interface PostIdProps {
  params: {
    findFriendId: string;
  };
}

export default async function FindFriendId({ params }: PostIdProps) {
  const { findFriendId } = params;
  return (
    <>
      <BoardDetailView id={findFriendId} />
    </>
  );
}
