import Link from "next/link";
import { FaArrowAltCircleLeft, FaComments } from "react-icons/fa";
import Button from "@/app/components/common/Button";
import CommentCreate from "@/app/components/domain/board/CommentCreate";
import DOMPurify from "isomorphic-dompurify";
import BoardDetailViewButtonBox from "@/app/components/domain/board/BoardDetailViewButtonBox";
import { readPost } from "@/app/actions";
import NickNameBox from "@/app/components/domain/board/NickNameBox";
import CommentArea from "@/app/components/domain/board/CommentArea";

export default async function BoardDetailView({
  postId,
  boardTitle,
}: {
  postId: string;
  //임시 추후 분리 완료하면 ? 제거
  boardTitle?: string;
}) {
  const post = await readPost(Number(postId));

  if (!post) {
    return null;
  }

  const { id, title, content, name, comment } = post;

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-[50%] h-auto gap-5 pt-10 px-3 bg-gray-100">
        <Link href="./" className="max-w-[10%]">
          <p>{boardTitle}</p>
        </Link>
        <Link href="./" className="flex gap-1 items-center">
          <Button
            style={{
              backgroundColor: "bg-mainColor",
              hoverColor: "hover:bg-mainHover",
            }}
          >
            <div className="flex gap-1">
              <FaArrowAltCircleLeft className="w-[25px] h-[25px]" />
              <span>이전</span>
            </div>
          </Button>
        </Link>
        <div className="flex flex-col gap-5 mb-10">
          <ContentArea title={title} content={content} name={name} />
        </div>
        <div>
          <BoardDetailViewButtonBox postId={String(id)} name={name} />
        </div>
        <CommentArea list={comment} postId={postId} />
      </div>
    </div>
  );
}
//본문 영역
function ContentArea({
  title,
  content,
  name,
}: {
  title: string;
  content: string;
  name: string;
}) {
  return (
    <>
      <h1 className="text-3xl break-all">{title}</h1>
      <div className="flex bg-gray-300 p-1 rounded-[4px] break-all">
        <NickNameBox name={name} />
      </div>
      <div className="pb-20 border-b border-gray-400 break-all mt-5">
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(content, {
              // ALLOWED_TAGS: [],
              // ALLOWED_ATTR: [],
            }),
          }}
        />
      </div>
    </>
  );
}
