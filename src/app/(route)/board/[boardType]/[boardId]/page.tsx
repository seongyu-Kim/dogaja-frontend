import BoardDetailView from "@/app/components/domain/board/BoardDetailView";
import getBoardTitle from "@/app/utils/getBoardTitle";
import { Metadata } from "next";
import { readPost } from "@/app/actions";
interface PostIdProps {
  params: {
    boardType: string;
    boardId: string;
  };
}

export async function generateMetadata({
  params,
}: PostIdProps): Promise<Metadata> {
  const { boardId } = params;
  const post = await readPost(Number(boardId));
  if (!post) {
    return {
      title: "Do가자",
      description: "여행플래너 Do가자",
    };
  }
  return {
    title: post.title,
    description: post.content,
  };
}

export default async function FindFriendId({ params }: PostIdProps) {
  const { boardId, boardType } = params;
  const title = getBoardTitle(boardType);
  return <BoardDetailView postId={boardId} boardTitle={title} />;
}
