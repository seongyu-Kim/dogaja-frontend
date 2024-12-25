import BoardDetailView from "@/app/components/domain/board/BoardDetailView";
interface PostIdProps {
  params: {
    ReportId: string;
  };
}

export default async function ReportId({ params }: PostIdProps) {
  const { ReportId } = params;
  return (
    <>
      <BoardDetailView id={ReportId} />
    </>
  );
}
