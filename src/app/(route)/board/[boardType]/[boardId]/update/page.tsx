import PostUpdate from "@/app/components/domain/board/PostUpdate";
import { readPost } from "@/app/actions";

interface Params {
  params: {
    boardId: string;
  };
}

export default async function FindFriendPostUpdatePage({ params }: Params) {
  const { boardId } = params;
  const post = await readPost(Number(boardId));
  if (!post) {
    return (
      <p className="flex items-center justify-center">
        데이터를 불러오지 못했습니다. 다시 시도해주세요
      </p>
    );
  }
  return <PostUpdate post={post} />;
}
