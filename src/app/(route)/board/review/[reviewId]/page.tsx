import BoardDetailView from "@/app/components/domain/board/BoardDetailView";
interface PostIdProps {
  params: { reviewId: string };
}

export default async function ReviewId({ params }: PostIdProps) {
  const { reviewId } = params;
  return (
    <>
      <BoardDetailView id={reviewId} />
    </>
  );
}
