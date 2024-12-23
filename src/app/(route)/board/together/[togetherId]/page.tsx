import BoardDetailView from "@/app/components/domain/board/BoardDetailView";
interface PostIdProps {
  params: { togetherId: string };
}

export default async function ReviewId({ params }: PostIdProps) {
  const { togetherId } = params;
  return (
    <>
      <BoardDetailView id={togetherId} />
    </>
  );
}
