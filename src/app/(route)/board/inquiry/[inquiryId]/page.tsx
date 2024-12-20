import BoardDetailView from "@/app/components/domain/board/BoardDetailView";
interface PostIdProps {
  params: { inquiryId: string };
}

export default async function InquiryId({ params }: PostIdProps) {
  const { inquiryId } = params;
  return (
    <>
      <BoardDetailView id={inquiryId} />
    </>
  );
}
