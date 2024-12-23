import Link from "next/link";
import { FaArrowAltCircleLeft, FaComments } from "react-icons/fa";
import Button from "@/app/components/common/Button";
import CommentList from "@/app/components/domain/board/CommentList";
import CommentCreate from "@/app/components/domain/board/CommentCreate";
import DOMPurify from "isomorphic-dompurify";

const testList = [
  // 임시 테스트 리스트
  {
    id: 1,
    name: "여기저기",
    comment: "1번 댓글입니다",
  },
  {
    id: 2,
    name: "이거저거",
    comment: "2번 댓글입니다",
  },
  {
    id: 3,
    name: "여기저기",
    comment: "3번 댓글입니다",
  },
];

export default async function BoardDetailView({
  id,
  boardTitle,
}: {
  id: string;
  //임시 추후 분리 완료하면 ? 제거
  boardTitle?: string;
}) {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-[50%] h-auto gap-5 pt-10 px-3 bg-gray-100">
        <Link href="./">
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
          <ContentArea />
        </div>
        <div>
          <ButtonBox postId={id} />
        </div>
        <CommentArea />
        <CommentCreate />
      </div>
    </div>
  );
}
//본문 영역
function ContentArea() {
  //임시 콘텐츠
  const content =
    "<p>콘텐츠입니다</p><br><button>클릭해주세요</button><br><img src='' alt='깨진이미지'/><br><script>alert('안녕하세요')</script>";
  return (
    <>
      <h1 className="text-3xl break-words">제목</h1>
      <div className="flex bg-gray-300 p-1 rounded-[4px] break-words">
        <p>닉네임</p>
      </div>
      <div className="pb-20 border-b border-gray-400 break-words mt-5">
        <p>내용</p>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(content, {
              ALLOWED_TAGS: [],
              ALLOWED_ATTR: [],
            }),
          }}
        />
      </div>
    </>
  );
}
//버튼 영역
function ButtonBox({ postId }: { postId: string }) {
  const a = true; //임시 추후 유저 데이터 값으로 버튼 필터링
  return (
    <div className="flex items-center justify-between">
      <p>신고</p>
      <div className="flex gap-2">
        <Link href="./create">
          <Button
            style={{
              backgroundColor: "bg-mainColor",
              hoverColor: "hover:bg-mainHover",
              width: "w-[90px]",
            }}
          >
            글 작성
          </Button>
        </Link>
        {a && (
          <Link href={`./${postId}/update`}>
            <Button
              style={{
                backgroundColor: "bg-mainColor",
                hoverColor: "hover:bg-mainHover",
                width: "w-[90px]",
              }}
            >
              수정
            </Button>
          </Link>
        )}
        {a && (
          <Button
            style={{
              backgroundColor: "bg-mainColor",
              hoverColor: "hover:bg-mainHover",
              width: "w-[90px]",
            }}
          >
            삭제
          </Button>
        )}
      </div>
    </div>
  );
}
// 댓글 영역
function CommentArea() {
  return (
    <div className="flex flex-col gap-3 border-b border-gray-400 pb-6">
      <div className="flex gap-3 items-center">
        <FaComments className="w-[35px] h-[35px] text-gray-400" />
        <p>{1} 댓글(댓글 배열 길이 넣기~)</p>
      </div>
      <div>
        <CommentList list={testList} />
      </div>
    </div>
  );
}
